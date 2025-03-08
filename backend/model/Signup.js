import mongoose from "mongoose";

const { Schema, model } = mongoose;

const signupSchema = new Schema({
  fname: { type: String, required: true },
  sname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  username: { type: String, required: true, unique: true }, 
  password: { type: String, required: true }
});



const Signup = model("Signup", signupSchema);

export default Signup;
