import AfricasTalking from 'africastalking';
import 'dotenv/config';


// Load credentials from .env
const credentials = {
    apiKey: process.env.SMS_apiKey, 
    username: process.env.SMS_username
};


const africastalking = AfricasTalking(credentials);
const sms = africastalking.SMS;

const SMS_verification = async (phoneNumber) => {
    try {
        const options = {
            to: [phoneNumber],
            message: "Testing SMS ",
            from: "Surethrift"
            
        };
     
        const response = await sms.send(options);
        console.log("SMS response:", response);

    } catch (error) {
        console.error("Error sending SMS:", error.response?.data || error);
    }
};

export default SMS_verification;
