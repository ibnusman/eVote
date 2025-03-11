# eVote
# eVote - Backend API

This repository contains the backend implementation of **eVote**, built using Node.js, Express, MongoDB, and bcrypt. 
## 📌 Features
- User registration & login with password hashing (bcrypt)
- OTP generation & verification for password reset (2FA)
- Password reset functionality
- Database persistence with MongoDB
- Secure password storage
- Email delivery of OTPs using `nodemailer`


Install dependencies:
bash
Copy
Edit
npm install
Set up your .env file:
ini
Copy
Edit
MONGO_URI=your_mongodb_connection_string 
PORT=5000
Start the server:
bash
Copy
Edit
npm start
📌 API Endpoints
1. User Registration
bash
Copy
Edit
POST /api/register
Request Body:

json
Copy
Edit
{
  "email": "user@example.com",
  "password": "yourpassword"
}
Response:

json
Copy
Edit
{
  "message": "User registered successfully"
}
2. OTP Verification (2FA)
bash
Copy
Edit
POST /api/2fa
Request Body:

json
Copy
Edit
{
  "smsOTP": "123456",
  "emailOTP": "654321"
}
Response:

json
Copy
Edit
{
  "message": "OTP verified successfully"
}
3. User Login
bash
Copy
Edit
POST /api/login
Request Body:

json
Copy
Edit
{
  "email": "user@example.com",
  "password": "yourpassword"
}
Response:

json
Copy
Edit
{
  "message": "Login Successful"
}
4. Forget Password (Request OTP)
bash
Copy
Edit
POST /api/forgetPassword
Request Body:

json
Copy
Edit
{
  "email": "user@example.com"
}
Response:

json
Copy
Edit
{
  "message": "OTP sent successfully. Please check your email.",
  "email": "user@example.com"
}
5. Change Password (Verify OTP & Update Password)
bash
Copy
Edit
POST /api/changePassword
Request Body:

json
Copy
Edit
{
  "email": "user@example.com",
  "otp": "123456",
  "pass": "newpassword"
}
Response:

json
Copy
Edit
{
  "message": "Password updated successfully"
}
📌 Usage Notes
The /api/2fa route verifies the OTPs sent via SMS and email.
Ensure your frontend integrates properly with all endpoints.
Set up your email service properly for sending OTPs.
🛠️ Technologies Used
Node.js
Express
MongoDB
Mongoose
bcrypt
nodemailer
speakeasy or otplib (for OTP generation & validation)
💡 Frontend Interaction
Your frontend should be able to:

Send registration and login requests to the /api/register and /api/login endpoints respectively.
Request OTPs via the /api/forgetPassword endpoint and verify them using /api/2fa.
Change passwords via the /api/changePassword endpoint after OTP verification.
