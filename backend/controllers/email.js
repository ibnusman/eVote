import nodemailer from 'nodemailer'
import 'dotenv/config';
import speakeasy from 'speakeasy'
import Otp from '../model/Otp.js';
import { twoFA } from './sendOTP.js';
import { authenticator } from 'otplib';

// var secret = speakeasy.generateSecret({length: 20});
const secret = speakeasy.generateSecret().base32; 
var emailOTP = speakeasy.totp({
  secret: secret.base32,
  encoding: 'base32'
});

// authenticator.options = { step: 300 }; // OTP expires in 5 minutes

// const secret = authenticator.generateSecret();
// const emailOTP = authenticator.generate(secret);


let transporter = nodemailer.createTransport({
  service: 'gmail', 
    port: 587, // Use 587 for TLS (recommended) or 465 for SSL
  secure: false,
  auth: {
    user: process.env.EMAIL_USER, 
    pass: process.env.EMAIL_PASS, // App password
  },
});

const sendEmail = async (to) => {
  // try{
  //   const vEmail = new Otp({emailOTP});
  //   await vEmail.save();

  //   const sentOtp = await Otp.findOne({emailOTP})

  //   console.log(sentOtp);

  // }catch(error){
  //   console.log(error)
  // }
try {
  await twoFA(null,emailOTP,secret)

} catch (error) {
  console.log(error)
}
  
    const mailOptions = {
        from:process.env.EMAIL_USER,
        to,
        subject:'Your code is',
        text:`Your OTp is ${emailOTP}`
    };

    try{
   
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent:', info.response);
    } catch(error){
        console.error('error sending ', error);
    }
};

export default sendEmail;
