const dotenv = require('dotenv');
const express = require("express");
const multer = require('multer');
const cloudinary = require('cloudinary').v2
const cors = require('cors')
const app = express();
const cron = require('node-cron')
app.use(express.json());
const appointmentsRoutes = require('./api/appointments'); 
const authorizationRoutes = require('./api/authorization');
const roomsRoutes = require('./api/rooms');
const patientRoutes = require('./api/patient');
const doctorRoutes = require('./api/doctor');
const testRoutes = require('./api/test');
const sendEmail = require('./api/mailer');
dotenv.config();
const { createClient } = require('@supabase/supabase-js');
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);
app.use(cors({
    origin : ["http://localhost:5173", "https://carewell-xi.vercel.app" ,"https://carewell-future.netlify.app"],
    methods: "GET,POST,PUT,DELETE,PATCH,OPTIONS",
    credentials: true
}))
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
const storage = multer.memoryStorage(); 
const upload = multer({ storage });

//---------------------------------Cloud-----------------------------------------
app.post("/upload", upload.single("image"), async (req, res) => {
    console.log("Received request for file upload");

    try {
        if (!req.file) {
            console.log("No file uploaded");
            return res.status(400).json({ error: "No image uploaded" });
        }

        console.log("Uploading to Cloudinary...");
        const result = await cloudinary.uploader.upload_stream(
            { folder: "uploads" },
            (error, result) => {
                if (error) {
                    console.log("Cloudinary upload failed:", error);
                    return res.status(500).json({ error: "Cloudinary upload failed" });
                }
                console.log("Upload successful:", result);
                res.json({ imageUrl: result.secure_url });
            }
        ).end(req.file.buffer);

    } catch (error) {
        console.log("Server error:", error);
        res.status(500).json({ error: "Server error" });
    }
});

app.post("/mailer", async(req,res)=>{
    try
    {
        console.log(req.body);
        const {email,message} = req.body; 
        console.log("calling send email");
        await sendEmail(email,message);
        console.log("email sent successfully"); 
        res.status(200).json(
            {
                "status":"Done"
            })
    }
    catch(e)
    {
        console.error(e);
        res.status(400).json({
            error:e.message
        });
    }
})

app.use('/api/authorization', authorizationRoutes);
app.use('/api/appointments', appointmentsRoutes);
app.use('/api/rooms',roomsRoutes);
app.use('/api/patient',patientRoutes);
app.use('/api/doctor',doctorRoutes);
app.use('/api/test',testRoutes);

app.get('/', (req, res) => 
{  
    return res.status(200).json({
        "status": "success"
    });
});

app.get('/test', async (req, res) => 
{
    try 
    {
        const { data, error } = await supabase
            .from('test_table')
            .select('*');
        
        if (error) 
        {
            return res.status(500).json({ error: error.message });
        }
        res.json({ data });
    } 
    catch (err) 
    {
        res.status(500).json({ error: err.message });
    }
});
async function DoctorEmail() {
    console.log("Fetching doctor email info...");
    const { data, error } = await supabase
        .from('doctors')
        .select('*');
    
    if (error) {
        console.error("Error fetching doctor emails:", error.message);
        return null;
    }

    return data;
}
async function SendAppRemainder()
{
    console.log("checking for email.....");
    const now = new Date();
    now.setHours(now.getHours()+5)
    now.setMinutes(now.getMinutes()+30)
    const sqlFormattedTime = now.toISOString().slice(0, 19).replace('T', ' ');
    const [date,time] = sqlFormattedTime.split(' ')
    console.log(date)
    const doctorEmail = await DoctorEmail(); 
    const emailinfo = new Map();
    for(var i = 0;i<doctorEmail.length;i++){
        emailinfo.set(doctorEmail[i].doctorid,{
            name:doctorEmail[i].d_name,
            email:doctorEmail[i].email
        })
    }
    console.log(emailinfo)
    const {data,error} = await supabase
    .from('appointments')
    .select('*')
    .eq('date',date)
    .eq('time',time)

    if(error)
        {
            return res.status(500).json({err:error.message})
        }
    if(data!=null)
        {   
            const message = []
            for(var i=0;i<data.length;i++)
            {
                const doctorInfo = emailinfo.get(data[i].doctorid);  
                if (doctorInfo) { 
                    let txt = `Dr.${doctorInfo.name} you have appointment no: ${data[i].appointmentid} with patient ID:${data[i].patientid} today at ${data[i].time}`;
                    let mss = 
                    {
                        doctorID: data[i].doctorid, 
                        message: txt
                    };
                    message.push(mss);
                } else {
                    console.log(`No doctor found for doctorid: ${data[i].doctorid}`);
                }
            }
            console.log(message)
            for (let i = 0; i < message.length; i++) {
                const doctorID = message[i].doctorID;
                const doctor = emailinfo.get(doctorID);  
                if (doctor) 
                    {  
                  console.log(`Sending email to: ${doctor.email}`);
                  console.log(`Message: ${message[i].message}`);
                  await sendEmail(doctor.email, message[i].message); 
                } else {
                  console.log(`Doctor with ID ${doctorID} not found in emailinfo`);
                }
                await new Promise(resolve => setTimeout(resolve, 2000));
              }
            console.log("-----------------------DONE---------------------------")
        }
}
cron.schedule('0 0 * * 0', SendAppRemainder);
app.listen(8080, () => 
{
    
    console.log("listening on port 8080");
});
