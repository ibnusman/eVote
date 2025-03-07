import mongoose from "mongoose";

const { Schema, model } = mongoose;

const signupSchema = new Schema({
    fname:{type: String, required: false},
    sname:{type: String,required: false },
    phone:{type: String,required: false},
    username:{type: String,required: false },
    email: {type: String,required: true, unique:true},
    password:{type: String, required: true}
});

const Signup = model('Signup', signupSchema);

export default Signup;
