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

router.get("/admissions", async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('admit')
            .select(`
                doctorid,
                patientid,
                bedno,
                admitdate,
                dischargedate,
                wardno,
                patients (patientid, patientname, age, gender),
                doctors (doctorid, doctorname, departmentid, departments (departmentid, departmentname))
            `);

        if (error) {
            return res.status(500).json({ err: error.message });
        }
        console.log(data);
        const transformedData = data.map((admission) => ({
            patientid: admission.patientid,
            doctorid: admission.doctorid,
            patientname: admission.patients.patientname,
            age: admission.patients.age,
            gender: admission.patients.gender,
            doctorname: admission.doctors.doctorname,
            department: admission.doctors.departments.departmentname,
            bedno: admission.bedno,
            admitdate: admission.admitdate,
            dischargedate: admission.dischargedate,
            wardno: admission.wardno,
        }));

        return res.status(200).json({ status: "success", data: transformedData });
    } catch (err) {
        return res.status(500).json({ err: err.message });
    }
});

router.post("/admitpatients",async (req,res)=>{
    const {patientid,type,doctorid} = req.body;
    let wno = null;
    let bedno = 0;
    let cap = 0;
    try{
        const {data,error} = await supabase
        .from('ward')
        .select('*')
        .eq('type',type)

        if(error){
            return res.status(500).json({err:error.message})
        }
        if(!data || data.length==0){
            return res.status(500).json({err:"No such ward exists"})
        }
        console.log(data[0]);
        const {wardno,maxcapacity,remcapacity} = data[0]
        //console.log(wardno,maxcapacity,remcapacity)
        if(remcapacity==0){
            return res.status(500).json({err:"Ward is totally occupied"})
        }
        wno = wardno
        cap = remcapacity
    }catch(err){
        return res.status(500).json({err:err.message})
    }
    try{   
        const{data,error} = await supabase
        .from('ward')
        .update([{'remcapacity':cap-1}])
        .eq('wardno',wno)

        if(error){
            return res.status(500).json({err:error.message})
        }
    }catch(err){
        return res.status(500).json({err:err.message})
    }   
    try{
        const {data,error} = await supabase
        .from('admit')
        .select('bedno')
        .eq('wardno',wno)
        .is('dischargedate',null)
        
        let store = []
        if(error){
            return res.status(500).json({err:error.message})
        }
        if(data!=null){
            for(let i = 0;i<data.length;i++){
                store.push(data[i].bedno)
            }
        }
        store.sort();
        let cur = 0;
        for(let i=0;i<store.length;i++){
            if(store[i]==cur){
                cur+=1
            }
            else{
                break
            }
        }
        bedno = cur;
    }catch(err){
        return res.status(500).json({err:err.message})
    }
    try{
        // const timestmp =  new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
        const timestmp = new Date().toISOString();
        const {data,error} = await supabase
        .from('admit')
        .insert([{patientid:patientid,admitdate:timestmp,wardno:wno,bedno:bedno,dischargedate:null,doctorid:doctorid}])
        .select('*')
        if(error){
            return res.status(500).json({err:error.message})
        }
        return res.status(200).json({"status":"done",data:data})
    }catch(err){
        return res.status(500).json({err:err.message})
    }
})

router.put("/dischargepatient",async (req,res)=>{
    const {patientid,dischargedate,wardno} = req.body;
    try{    
        const {data,error} = await supabase
        .rpc('update_remcapacity',{
            wno:wardno
        })
        if(error){
            return res.status(500).json({err:error.message})
        }
    }catch(err){
        return res.status(500).json({err:err.message})
    }
    try{
        const {data,error} = await supabase
        .from('admit')
        .update({'dischargedate':dischargedate})
        .is('dischargedate',null)
        .eq('patientid',patientid)
        if(error){
            return res.status(500).json({err:error.message})
        }
        return res.status(200).json({"status":"done"})
    }catch(err){
        return res.status(500).json({err:err.message})
    }
})
router.get("/allrooms",async (req,res)=>{
    try{
        const {data,error} = await supabase
        .from('ward')
        .select('*')

        if(error){
            return res.status(500).json({err:error.message})
        }
        return res.status(200).json({"status":"success","data":data})
    }catch(err){
        return res.status(500).json({err:err.message})
    }
})
router.get("/partiroom:id",async(req,res)=>{
    const {id} = req.query;
    try{
        const {data,error} = await supabase
        .from('ward')
        .select('*')
        .eq('wardno',id)

        if(error){
            return res.status(500).json({err:error.message})
        }
        return res.status(200).json({"status":"success","data":data})
    }catch(err){
        return res.status(500).json({err:err.message})
    }
})
module.exports = router