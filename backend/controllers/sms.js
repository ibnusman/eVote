import AfricasTalking from 'africastalking';
import 'dotenv/config';
import { authenticator } from 'otplib';
import Otp from '../model/Otp.js';
import { twoFA } from './sendOTP.js';


// Load credentials from .env
const credentials = {
    apiKey: process.env.SMS_apiKey, 
    username: process.env.SMS_username
};


authenticator.options = { step: 300 }; // OTP expires in 5 minutes

const secret = authenticator.generateSecret();
const smsOTP = authenticator.generate(secret);


const africastalking = AfricasTalking(credentials);
const sms = africastalking.SMS;

const SMS_verification = async (phoneNumber) => {
    console.log(smsOTP);
// try{
//     const vSMS = new Otp({smsOTP,secret});
//    await vSMS.save();

//     const rtotp = await Otp.findOne({smsOTP})
//     console.log("strred", smsOTP)
    
// }
// catch(error)
// {
//     console.log(error)
// }
try {
  await twoFA(smsOTP,null,secret)
  
} catch (error) {
  console.log(error)
}
    try {
        const options = {
            to: [phoneNumber],
            message: `Your OTP is ${smsOTP} `,
            // from: "Surethrift"
            
        };
     
        const response = await sms.send(options);
        console.log("SMS response:", response);

    } catch (error) {
        console.error("Error sending SMS:", error.response?.data || error);
    }
};

export default SMS_verification;
