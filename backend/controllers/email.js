import nodemailer from 'nodemailer'
import 'dotenv/config';



let transporter = nodemailer.createTransport({
  service: 'gmail', 
  auth: {
    user: process.env.EMAIL_USER, // Your email
    pass: process.env.EMAIL_PASS, // App password
  },
});

const sendEmail = async (to) => {
    const mailOptions = {
        from:process.env.EMAIL_USER,
        to,
        subject:'Your code is',
        text:`Your OTp is `
    };

    try{
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent:', info.response);
    } catch(error){
        console.error('error sending ', error);
    }
};

export default sendEmail;
