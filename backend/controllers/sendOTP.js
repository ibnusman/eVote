import Otp from "../model/Otp.js";

export const twoFA = async (smsOTP, emailOTP, secret) => {
    try {
        const tFA = new Otp({
            smsOTP,
            emailOTP,
            secret,
            expiresAt: new Date(Date.now() + 5 * 60 * 1000)  // Set to expire in 5 minutes
        });

        await tFA.save();  // Save the OTP to the database
        console.log("OTP saved successfully.");

        // Fetch the saved OTP by searching for the one you just saved
        if (smsOTP) {
            const verifysave = await Otp.findOne({ smsOTP });
            console.log("The saved SMS OTP is: ", verifysave);
        }

        if (emailOTP) {
            const verifysave = await Otp.findOne({ emailOTP });
            console.log("The saved Email OTP is: ", verifysave);
        }

    } catch (error) {
        console.log("Error saving OTP:", error);
    }
};
