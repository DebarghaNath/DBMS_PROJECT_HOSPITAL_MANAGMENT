const dotenv = require('dotenv');
dotenv.config();
const { createClient } = require('@supabase/supabase-js');
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);
const express = require('express')
const router = express.Router();

// GET
router.get("/", (req, res) => {
    console.log("test api");
    return res.status(200).json({success:"success"});
})

// Get all appointments of a doctor
router.get("/:doctorid/appointments", async (req, res) => {
    const { doctorid } = req.params;

    try {
        const { data: appointments, error } = await supabase
            .from('appointments')
            .select(`
                appointmentid,
                patientid,
                date,
                time,
                priority,
                disease,
                patients (patientname, age, gender, weight, imageurl)
            `)
            .eq('doctorid', doctorid)
            .order('date', { ascending: false })
            .order('time', { ascending: false });

        if (error) {
            console.error("Supabase fetch error:", error);
            return res.status(500).json({ err: error.message });
        }

        if (!appointments || appointments.length === 0) {
            return res.status(404).json({ error: "No appointments found for this doctor" });
        }

        const formattedAppointments = appointments.map((appointment) => ({
            appointmentid: appointment.appointmentid,
            patientid: appointment.patientid,
            date: appointment.date,
            time: appointment.time,
            priority: appointment.priority,
            disease: appointment.disease,
            ...appointment.patients,
        }));

        return res.status(200).json({ status: "success", appointments: formattedAppointments });
    } catch (err) {
        console.error("Error fetching appointments:", err.message);
        return res.status(500).json({ err: err.message });
    }
});

// All patients under a given Doctor
router.get("/:doctorid/patient",async (req,res)=>{
    const {doctorid} = req.params;
    try{
        const { data, error } = await supabase
            .from('appointments')
            .select(`
                patientid,
                date,
                time,
                priority,
                disease,
                patients (patientname, age, weight, gender, imageurl)
            `)
            .eq('doctorid',doctorid)
            .order('date',{ascending: false}) 
            .order('time',{ascending: false});

        if(error){
            return res.status(500).json({err:error.message})
        }
        if(!data){
            return res.status(404).json({error:"(Doctor,Patient) not found"})
        }

        const formattedData = data.map((appointment) => ({
            patientid: appointment.patientid,
            date: appointment.date,
            time: appointment.time,
            priority: appointment.priority,
            disease: appointment.disease,
            ...appointment.patients, 
        }));

        return res.status(200).json({"status":"success","patientdata":formattedData})
        
    }
    catch(err){
        return res.status(500).json({err:err.message})
    }
})

// Single patient for a given Doctor
router.get("/:doctorid/patient/:patientid",async (req,res)=>{
    const {doctorid,patientid} = req.params;
    console.log(doctorid);
    console.log(patientid);

    try{
        const { data:patientData, error:patientError } = await supabase
            .from('patients')
            .select(`*`)
            .eq('patientid',patientid)

        if(patientError){
            return res.status(500).json({err:patientError.message})
        }
        if(!patientData){
            return res.status(404).json({error:"Patient not found"})
        }

        const { data:appointmentData, error:appointmentError } = await supabase
            .from('appointments')
            .select('*')
            .eq('doctorid',doctorid)
            .eq('patientid',patientid)
            .order('date',{ascending: false}) 
            .order('time',{ascending: false});
        
        if(appointmentError){
            return res.status(500).json({err:appointmentError.message})
        }
        if(!appointmentData){
            return res.status(404).json({error: "(Doctor,Patient) appointment not found"})
        }

        const { data:prescriptionData, error:prescriptionError } = await supabase
            .from('prescriptions')
            .select('*')
            .eq('doctorid',doctorid)
            .eq('patientid',patientid)

        if(prescriptionError){
            return res.status(500).json({err:prescriptionError.message})
        }

        const data = {patientData, appointmentData, prescriptionData};
        console.log(data);
        return res.status(200).json({"status":"success",data})
        
    }
    catch(err){
        return res.status(500).json({err:err.message})
    }
})

// POST

// Create a new Prescription
router.post("/:doctorid/patient/:patientid/prescription",async (req, res) => 
{
    const {doctorid,patientid} = req.params;
    const {medicinename,dosage,frequency,duration,notes,startdate} = req.body;
    try{
        const { error:postError } = await supabase
            .from("prescriptions")
            .insert({doctorid, patientid, medicinename, dosage, notes, startdate, frequency, duration})
        
        if (postError) {
            console.error("Supabase insert error:", postError);
            return res.status(500).json({ err: postError.message });
        }

        return res.status(200).json({ 
            success: true
        });
    } catch (err) {
        return res.status(500).json({ err: err.message });
    }
});

// PATCH 

// Update existing prescription
router.patch("/:doctorid/patient/:patientid/prescription/:medicinename",async (req, res) => 
{
    const {doctorid,patientid,medicinename} = req.params;
    const {dosage,frequency,duration} = req.body;
    try {
        const {error} = await supabase
            .from('prescriptions')
            .update({dosage,frequency,duration})
            .eq('doctorid', doctorid)
            .eq('patientid', patientid)
            .eq('medicinename', medicinename)

        if (error) {
            console.error("Supabase udpate error:", error);
            return res.status(500).json({ err: error.message });
        }

        return res.status(200).json({ 
            success: true
        });
    } catch (err) {
        return res.status(500).json({ err: err.message });
    }
})

router.delete("/:doctorid/patient/:patientid/prescription/:medicinename",async (req, res) => 
{
    const {doctorid,patientid,medicinename} = req.params;
    try {
        const { error } = await supabase
            .from('prescriptions')
            .delete()
            .eq('doctorid', doctorid)
            .eq('patientid', patientid)
            .eq('medicinename', medicinename);

        if (error) {
            console.error("Supabase delete error:", error);
            return res.status(500).json({ error: error.message });
        }
        
        return res.status(200).json({ success: true });
    } catch (err) {
        return res.status(500).json({ err: err.message });
    }
});

module.exports = router;