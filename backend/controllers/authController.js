import express from 'express'
import bodyParser from 'body-parser'
import bcrypt from "bcryptjs";
import db from '../config/db.js'
import Signup from '../model/Signup.js';
import AfricasTalking from 'africastalking';
import SMS_verification from './sms.js';


const app = express();
app.use(bodyParser.json());  
app.use(bodyParser.urlencoded({ extended: true })); 
const credentials = {
  apiKey:process.env.SMS_apiKey,
  username: process.env.SMS_username
}
const africastalking = AfricasTalking(credentials);
const sms = africastalking.SMS;
const userSignup = async (req, res) => {
  try {
    const { fname, sname, email, phone, username, pass } = req.body;
    console.log("Request body:", req.body);

    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(pass, salt);

    // Using create() 
    const newUser = await Signup.create({ fname, sname, email, phone, username, password });

    // console.log(newUser);
   
    //implimenting SMS OTP
   await SMS_verification(phone);

    //end of SMS
    res.status(200).json({ message: "User registered successfully!" });
   
  } catch (error) {
    if (error.code === 11000) {
        const duplicatedEmail = error.keyValue.email
     
      console.log(`${duplicatedEmail} already exist`);
      res.status(400).json({ message: `${duplicatedEmail}Email already exists`});
    } else {
      console.error("Error adding user", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
};


export default userSignup;
