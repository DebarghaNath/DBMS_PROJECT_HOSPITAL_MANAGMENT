const dotenv = require('dotenv');
dotenv.config();
const { createClient } = require('@supabase/supabase-js');
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);
const express = require('express')
const router = express.Router();
const sendEmail = require('./mailer');
const { promises } = require('nodemailer/lib/xoauth2');
const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.JWT_SECRET

function deconstructToken(token){
    try {
        const payload = jwt.verify(token, SECRET_KEY);
        return payload;
    } catch (err) {
        throw new Error('Invalid or expired token');
    }
}

async function validateToken(token) {
    try {
        const payload = deconstructToken(token);
        const {role,email} = payload;

        const {data,error} = await supabase
        .from('users')
        .select('*')
        .eq('role',role)
        .eq('email',email)
        .eq('token',token);

        console.log(data);
        if(error){
            throw new Error(error.message);
        }
        if (!data || data.length === 0) {
            throw new Error("Invalid token credentials");
        }
        return data[0];
    } catch (err) {
        throw new Error(err.message);
    }
}

async function checkValid(req,res,next)
{
    // const token = req.headers['token'];
    const authHeader = req.headers['authorization'];
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({err: "Authorization header missing or invalid"});
    }
    const token = authHeader.split(' ')[1];

    try{
        const user = await validateToken(token);
        console.log(user);
        req.user = user;
        next();
    }catch(err){
        return res.status(401).json({err:err.message})
    }

}

router.get("/:patientid/:doctorid", async (req, res) => {
    const { patientid, doctorid } = req.params;

    try {
        const { data: tests, error } = await supabase
            .from('tests')
            .select('*')
            .eq('patientid', patientid)
            .eq('doctorid', doctorid);

        if (error) {
            console.error("Supabase fetch error:", error);
            return res.status(500).json({ err: error.message });
        }

        if (!tests || tests.length === 0) {
            return res.status(404).json({ error: "No tests found for the given patient and doctor" });
        }

        return res.status(200).json({ status: "success", tests });
    } catch (err) {
        console.error("Error fetching tests:", err.message);
        return res.status(500).json({ err: err.message });
    }
});

router.post("/add", async (req, res) => {
    const { patientid, doctorid, type, testdate, notes, parameters, status } = req.body;

    if (!patientid || !doctorid || !type || !testdate || !parameters || !status) {
        return res.status(400).json({ error: "Missing required fields" });
    }

    try {
        const { data, error } = await supabase
            .from('tests')
            .insert([
                {
                    patientid,
                    doctorid,
                    type,
                    testdate,
                    notes,
                    parameters,
                    status,
                },
            ]);

        if (error) {
            console.error("Supabase insert error:", error);
            return res.status(500).json({ error: error.message });
        }

        return res.status(201).json({ status: "success", message: "Test result added successfully", data: req.body });
    } catch (err) {
        console.error("Error adding test result:", err.message);
        return res.status(500).json({ error: err.message });
    }
});

router.post("/schedule", async (req, res) => {
    const { patientid, doctorid, type, notes } = req.body;

    // Validate required fields
    if (!patientid || !doctorid || !type) {
        return res.status(400).json({ error: "Missing required fields" });
    }

    try {
        // Step 1: Find the lab that will be recently free
        const currentTime = new Date().toISOString(); // Get the current time in ISO format
        const { data: labs, error: labError } = await supabase
            .from('laboratory')
            .select('*')
            .order('endtime', { ascending: true }) // Get the lab with the earliest endtime
            .order('labno', { ascending: true }) // Break ties by lab number
            .limit(1);

        if (labError) {
            console.error("Error fetching labs:", labError);
            return res.status(500).json({ error: labError.message });
        }

        if (!labs || labs.length === 0) {
            return res.status(400).json({ error: "No available laboratories at the moment" });
        }

        const assignedLab = labs[0];

        // Step 2: Determine the test start time
        let startTime;
        if (assignedLab.endtime) {
            // If the lab has an endtime, use it as the start time
            startTime = new Date(assignedLab.endtime);
        } else {
            // If the lab has never been used, use the current time
            startTime = new Date();
        }

        // Step 3: Calculate the test end time (30 minutes after the start time)
        const endTime = new Date(startTime.getTime() + 30 * 60 * 1000);

        // Format the start time into testdate and testtime
        const testdate = startTime.toISOString().split('T')[0]; // Extract the date part
        const testtime = startTime.toISOString().split('T')[1].split('.')[0]; // Extract the time part

        // Step 4: Schedule the test and assign the lab
        const { data: testData, error: testError } = await supabase
            .from('tests')
            .insert([
                {
                    patientid,
                    doctorid,
                    type,
                    testdate,
                    testtime,
                    notes,
                    labno: assignedLab.labno, // Assign the lab number
                },
            ])
            .select(); // Return the inserted test data

        if (testError) {
            console.error("Error scheduling test:", testError);
            return res.status(500).json({ error: testError.message });
        }

        // Step 5: Update the lab's endtime to reflect the test duration
        const { error: labUpdateError } = await supabase
            .from('laboratory')
            .update({ endtime: endTime.toISOString() })
            .eq('labno', assignedLab.labno);

        if (labUpdateError) {
            console.error("Error updating lab endtime:", labUpdateError);
            return res.status(500).json({ error: labUpdateError.message });
        }

        // Step 6: Return the scheduled test details
        return res.status(201).json({
            status: "success",
            message: "Test scheduled successfully",
            test: {
                ...testData[0],
                testdate,
                testtime,
            },
            lab: assignedLab,
        });
    } catch (err) {
        console.error("Error scheduling test:", err.message);
        return res.status(500).json({ error: err.message });
    }
});

module.exports = router;