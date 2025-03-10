import mongoose from "mongoose";

const {Schema, model} = mongoose;

const otpSchema = new Schema({
    smsOTP: {type: String},
    emailOTP: {type: String},
    secret: {type: String, required: true},
    createdAt: {type: Date, default: Date.now, expires: 300} // OTP expires in 5 minutes
});

const Otp = model("Otp", otpSchema);

export default Otp;
