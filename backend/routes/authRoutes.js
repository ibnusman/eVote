import express from 'express'
import bodyParser from 'body-parser'
import userSignup from '../controllers/authController.js';
import {otpVerification} from '../controllers/authController.js';
import { login } from '../controllers/authController.js';
import { forgetPassword } from '../controllers/authController.js';
import { changePassword } from '../controllers/authController.js';
import { createElection } from '../controllers/dashboardController.js';


const app = express();
const router = express.Router()

router.post("/register",userSignup);

router.post("/2fa",otpVerification);
router.post("/login", login)
router.post("/forgetPassword",forgetPassword)
router.post("/changePassword", changePassword)
router.post("/createElection", createElection)

export default router;
