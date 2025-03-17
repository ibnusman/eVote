import express from 'express'
import bodyParser from 'body-parser'
import bcrypt from "bcryptjs";
import db from '../config/db.js'
import User from '../model/User.js';
import AfricasTalking from 'africastalking';
import SMS_verification from './sms.js';
import sendEmail from './email.js';
import Otp from '../model/Otp.js';


const app = express();
app.use(bodyParser.json());  
app.use(bodyParser.urlencoded({ extended: true })); 


//User Signup
const userSignup = async (req, res) => {
  try {
    //Getting user input
    const { fname, sname, email, phone, username, pass } = req.body;
    console.log("Request body:", req.body);

    //hashing password
    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(pass, salt);

    // Add detials to DB
    const newUser = await User.create({ fname, sname, email, phone, username, password });

    // console.log(newUser);
   
    //Calling SMS function to send OTP
   await SMS_verification(phone);
 await sendEmail(email)
    //Success status
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

//Checking OTP
// export const otpVerification = async (req,res) =>{

// try{
// const { smsOTP, emailOTP } = req.body;
// //checking user OTP with whats sent 
//   const [checkSMSOtp, checkEmailOtp] = await Promise.all([
//     Otp.findOne({ smsOTP: smsOTP.trim() }),
//     Otp.findOne({ emailOTP: emailOTP.trim() })
//   ]);

//    console.log(checkSMSOtp,checkEmailOtp);
//    if(checkSMSOtp && checkEmailOtp)
//    {
//     res.status(200).json({message:"OTP verified successfully"})
//    }
//    else{
//     res.status(400).json({message:"Invalid OTP"})
//    }
  

// }catch(error){
//  console.error("Error during OTP verification:", error.message);  
//     res.status(500).json({ message: "An error occurred during OTP verification" });
// }



// }

//Setting Email only
export const otpVerification = async (req,res) =>{

try{
const {emailOTP } = req.body;
//checking user OTP with whats sent 
  const checkEmailOtp = await Otp.findOne({ emailOTP: emailOTP });

   console.log(checkEmailOtp);
   if(checkEmailOtp)
   {
    res.status(200).json({message:"OTP verified successfully"})
   }
   else{
    res.status(400).json({message:"Invalid OTP"})
   }
  

}catch(error){
 console.error("Error during OTP verification:", error.message);  
    res.status(500).json({ message: "An error occurred during OTP verification" });
}



}


//Login 
export const login = async (req,res) =>{

const {email, password} = req.body;
try {

const user = await User.findOne({email:email})


 const isValidPassowrd = await bcrypt.compare(password, user.password);
// console.log(isValidPassowrd)

if (!user){
  res.status(400).json({message:"User not found"});
}

if(isValidPassowrd)
{
 res.status(200).json({message:"login Succfully "})
}
else{
  res.status(400).json({message:"Invalid password"});
}

} catch (error) {
  res.status(500).json({message:"Server Error",error})
}

}

//Forget Password

export const forgetPassword = async (req, res)=>{
  const {email} = req.body;
try{
  const checkEmail = await User.findOne({email:email})
  if (!checkEmail){
    res.status(400).json({message:"Email does not exist"})

  }
   if (checkEmail){
    res.status(200).json({message:"Email valid"})
     await sendEmail(email)
    
     await otpVerification()

  }
}catch(error){
  console.error("Error validating Email",error)
}
}
//changing password
export const changePassword = async (req,res) =>{
  const {email,pass} = req.body;

  try {
    const getEmail = await User.findOne({email});
        console.log(getEmail)
      const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(pass, salt);
    getEmail.password = password;
    await getEmail.save();
    res.status(200).json({message:"Password updated Succcessfully"})
    
  } catch (error) {
     console.error("Error updating password:", error);
    res.status(500).json({ message: "Error updating password", error });
  }
}

export default userSignup;
