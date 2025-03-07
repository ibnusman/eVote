import express from 'express'
import bodyParser from 'body-parser'
import bcrypt from "bcryptjs";
import db from '../config/db.js'
import Signup from '../model/Signup.js';

const app = express();
app.use(bodyParser.json());  // ✅ Parses JSON data
app.use(bodyParser.urlencoded({ extended: true })); 


const userSignup = (req,res)=>{
try {
    const {fname,sname,email,phone,username,pass} = req.body;
    console.log("Request body:", req.body); 
bcrypt.genSalt(10, (err, salt) => {
  bcrypt.hash(pass, salt, async function (err, password) {
    
    const newUser = new Signup ({fname,sname,email,phone,username,password})
    await newUser.save();
    
    console.log(newUser);
    res.status(200).json({message:"Done"})
  });
});

} catch (error) {

    console.error(error);
    res.status(500).json({message:"Error connecting"});
    
}

};

export default userSignup;
