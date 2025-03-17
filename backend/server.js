import 'dotenv/config'
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser'
import passport from 'passport';
// import LocalStrategy from 'passport-local'
import bcrypt from "bcryptjs";
import User from './model/User.js';
import mongoose from 'mongoose';
import db from './config/db.js'
import authRoutes from './routes/authRoutes.js'; 


const port = process.env.PORT;
const app = express()

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors({
  origin: 'http://localhost:5173',  // Allow requests from this origin
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));



//homepage
app.get('/', function (req, res) {
  res.send('Voting System')

})

app.use("/api/auth",authRoutes);


app.listen(port,() =>{
console.log(`Listening on port ${port}`)

});
