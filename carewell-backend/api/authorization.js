const dotenv = require('dotenv');
dotenv.config();
const { createClient } = require('@supabase/supabase-js');
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);
const express = require('express')
const router = express.Router();
const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.JWT_SECRET
const sendMail = require('./mailer')
const twilio = require('twilio');
const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

async function Mail(email,message){
    try{
        sendMail(email,message);
        console.log("done");
    }catch(err){
        console.log(err.message)
    }
}
function generatToken(user){
    const payload={
        role:user.role,
        email:user.email
    }
    const token = jwt.sign(payload,SECRET_KEY, { expiresIn: '14d' });
    return token;
}
function deconstructToken(token){
    try {
        const payload = jwt.verify(token, SECRET_KEY);
        return payload;
    } catch (err) {
        throw new Error('Invalid or expired token');
    }
}
function generatePassWord(length)
{
    const charset = [
        'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
        'abcdefghijklmnopqrstuvwxyz',
        '0123456789',
        '!@#$%^&*()_+{}[]<>?'
    ];

    let password = "";
    while (password.length < length) {
        const w = Math.floor(Math.random() * charset.length);
        const val = charset[w];
        const index = Math.floor(Math.random() * val.length);
        password += val[index];
    }
    
    return password;

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
router.post("/login", async (req, res) => {
    const { email, password,role } = req.body; 
    const token = generatToken(req.body)
    try {
        const { data, error } = await supabase
            .from('users')
            .select('*')
            .eq('email', email)
            .eq('password', password)
            .eq('role',role)
            .single(); 
        if (error) {
            return res.status(500).json({ err: error.message });  
        }
        if (!data) {
            return res.status(404).json({ err: "User not found" });
        }
        const {update_data,update_error} = await supabase
            .from('users')
            .update({
                token: token,
                lastlogin: new Date().toISOString() // Set current timestamp
            })
            .eq("email",email)
            .eq("password",password)
            .eq("role",role)

        if(update_error){
            //console.log("HELLO")
            return res.status(500).json({err:update_error.message})
        }
        return res.status(200).json({ success: true, "token":token });

    } catch (err) {
        console.error('Server error:', err);
        return res.status(500).json({ err: err.message });  
    }
});

router.get("/getdetails",checkValid,async(req,res)=>{
    //console.log(token)
    try{
        console.log(req.user);
        const{data,error} = await supabase
        .from('users')
        .select('*')
        .eq('token', req.user.token)

        console.log("data");
        console.log(data)
        if(!data || data.length === 0){
            return res.status(500).json({err:"No such users found"})
        }
        if(error){
            return res.status(500).json({err:error.message})
        }
        return res.status(200).json({"status":"success","data":data[0]})
    }catch(err){
        return res.status(500).json({err:err.message})
    }
})

router.post('/send-otp', async (req, res) => {
    const { phoneNumber } = req.body;

    if (!phoneNumber) return res.status(400).json({ error: 'Phone number is required' });

    const otp = Math.floor(100000 + Math.random() * 900000); // Generate 6-digit OTP

    try {
        await client.messages.create({
        body: `Your OTP is ${otp}`,
        from: process.env.TWILIO_PHONE_NUMBER,
        to: `+91${phoneNumber}`, 
        });

        res.status(200).json({ success: true, message: 'OTP sent', otp }); // Don't send OTP in prod
    } catch (err) {
        res.status(500).json({ error: 'Failed to send OTP', details: err.message });
    }
});

router.post("/signup", checkValid, async (req, res) => {
    const { name, email, age, weight, gender, patientcontact, patientaddress, aadhaar } = req.body;

    try {
        const { data: existingPatients, error: fetchError } = await supabase
            .from("patients")
            .select("patientid");

        if (fetchError) {
            console.error("Error fetching patient IDs:", fetchError.message);
            return res.status(500).json({ err: fetchError.message });
        }

        const existingIds = existingPatients.map((patient) => patient.patientid).sort((a, b) => a - b);

        let patientid = 1;
        for (const id of existingIds) {
            if (id === patientid) {
                patientid++;
            } else {
                break;
            }
        }

        const { data, error } = await supabase
            .from("patients")
            .insert([{
                patientid: patientid,
                patientname: name,
                email: email,
                age: age,
                weight: weight,
                gender: gender,
                patientcontact: patientcontact,
                patient_address: patientaddress,
                aadhaar: aadhaar,
                additiontime: new Date().toISOString()
            }])
            .select();

        if (error) {
            console.error("Supabase query error:", error);
            return res.status(500).json({ err: error.message });
        }

        return res.status(200).json({ success: true, role: "patient", patientid: patientid });
    } catch (err) {
        console.error("Server error:", err);
        return res.status(500).json({ err: err.message });
    }
});

router.put("/logout", checkValid, async (req, res) => {
    try {
        const user = req.user;

        const { data, error } = await supabase
            .from('users')
            .update({ lastlogout: new Date().toISOString() }) 
            .eq('userid', user.userid) 
            .select();

        if (error) {
            console.error("Supabase update error:", error);
            return res.status(500).json({ err: error.message });
        }

        if (!data || data.length === 0) {
            return res.status(404).json({ err: "User not found" });
        }

        return res.status(200).json({ success: true, message: "Logout time updated successfully" });
    } catch (err) {
        console.error("Server error:", err);
        return res.status(500).json({ err: err.message });
    }
});

router.get("/checkaadhaar",checkValid,async (req,res)=>{
    const {aadhaar} = req.query;
    if(aadhaar.length!=12){
        return res.status(500).json({err:"Aadhaar number must be 12 digit"})
    }
    try{
        const {data,error} = await supabase
        .from('patients')
        .select('*')
        .eq('aadhaar',aadhaar)
        .single()

        if(data==null){
            return res.status(200).json({"status":"failure"})
        }
        else if(data.length!=0){
            return res.status(200).json({"status":"success","patientid":data.patientid})
        }
        else{
            return res.status(500).json({err:error.message})
        }
        
    }catch(err){
        return res.status(500).json({err:err.message})
    }   
})
router.put("/submit-password", async (req, res) => {
    const { email, password } = req.body;

    try {
        const {data,error } = await supabase
            .from('users')
            .update({ password: password }) 
            .eq('email', email)
            .select();
        console.log(data)
        if (error) {
            return res.status(500).json({ error: error.message });
        }
        if(data.length==0)
            {
                return res.status(500).json({ error:"user not found" });   
            }
        return res.status(200).json({ success: true });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
});
  
router.put("/addusers",checkValid,async (req,res)=>{
    const {name,email,mobile,role,departmentname} = req.body;
    const password = generatePassWord(12);

    try{
        const {data,error} = await supabase
        .from('users')
        .insert([{name:name,email:email,mobile:mobile,role:role,password:password,additiontime:new Date().toISOString(),imageurl: "https://res.cloudinary.com/dkymldtg7/image/upload/v1744894151/uploads/hdolgshglut7mqq6vzzw.jpg"}])
        .select()
        if(error){
            return res.status(500).json({err:error.message})
        }
        const message = `You are given the role : ${role} and your new password is : ${password}`
        await Mail(email,message)
        if(departmentname!=null)
        {
            const {data,error} = await supabase
            .rpc('insert_doctor_with_department', {
                name: name,
                email: email,
                mobile: mobile,
                department_name: departmentname,
              });
            if(error){
                return res.status(500).json({err:error.message})
            }
        }
        return res.status(200).json({"status":"done"})
    }catch(err){
        return res.status(500).json({err:err.message})
    }
})

router.delete("/deleteusers",checkValid,async(req,res)=>{
    const {id} = req.body;
    try{
        const {data,error} = await supabase
        .from('users')
        .delete()
        .eq('userid',id)

        if(error){
            return res.status(500).json({err:error.message})
        }

        return res.status(200).json({"status":"done"})
    }catch(err){
        return res.status(500).json({err:err.message})
    }
})

router.get('/showusers',checkValid,async(req,res)=>{
    try{
        const {data,error} = await supabase
        .from('users')
        .select('*')

        if(error){
            return res.status(500).json({err:error.message})
        }
        return res.status(200).json({"data":data})
    }catch(err){
        return res.status(500).json({err:err.message})
    }
})

module.exports = router