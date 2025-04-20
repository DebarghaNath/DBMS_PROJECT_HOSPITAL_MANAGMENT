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

router.get('/showpatients',checkValid,async(req,res)=>{
    try{
        const {data,error} = await supabase
        .from('patients')
        .select('*')

        if(error){
            return res.status(500).json({err:error.message})
        }
        return res.status(200).json({"data":data})
    }catch(err){
        return res.status(500).json({err:err.message})
    }
});

module.exports = router;