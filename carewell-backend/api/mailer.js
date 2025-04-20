const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER, 
        pass: process.env.EMAIL_PASS,
    },
});

const sendEmail = (email,message) => {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'DBMS Hospital',
        text: message,
    };
    console.log(mailOptions);
    try {
        transporter.sendMail(mailOptions);
        console.log(`Email sent to: ${email}`);
    } catch (error) {
        console.log(`Error sending email to ${email}: ${error.message}`);
    }
}

module.exports = sendEmail;