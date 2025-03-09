import mongoose from "mongoose";

const {Schema, model} = mongoose;

const otpSchema = new Schema({
    smsOTP:{type: String, required:true},
    emailOTP:{type:String, required:true}

});

const Otp = model("Otp", otpSchema);

export default Otp;
