import express from 'express'
import bodyParser from 'body-parser'
import userSignup from '../controllers/authController.js';

const app = express();
const router = express.Router()

router.post("/register",userSignup);

router.post("/2fa",userSignup);

export default router;
