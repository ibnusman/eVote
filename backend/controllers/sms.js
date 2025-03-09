import AfricasTalking from 'africastalking';
import 'dotenv/config';
import { authenticator } from 'otplib';



// Load credentials from .env
const credentials = {
    apiKey: process.env.SMS_apiKey, 
    username: process.env.SMS_username
};


authenticator.options = { step: 300 }; // OTP expires in 5 minutes

const secret = authenticator.generateSecret();
const otp = authenticator.generate(secret);


const africastalking = AfricasTalking(credentials);
const sms = africastalking.SMS;

const SMS_verification = async (phoneNumber) => {
    try {
        const options = {
            to: [phoneNumber],
            message: `Your OTP is ${otp} `,
            from: "Surethrift"
            
        };
     
        const response = await sms.send(options);
        console.log("SMS response:", response);

    } catch (error) {
        console.error("Error sending SMS:", error.response?.data || error);
    }
};

export default SMS_verification;
