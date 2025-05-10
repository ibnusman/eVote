// server.js

import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import passport from 'passport';
import bcrypt from 'bcryptjs';
import User from './model/User.js';
import mongoose from 'mongoose';
import db from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import dashboardRoutes from './routes/dashboardRoutes.js';

// Import the setupSwagger function
import setupSwagger from './swagger.js';

const port = process.env.PORT;
const app = express();

// Set up Swagger
setupSwagger(app);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// CORS setup
app.use(cors({
  // origin: 'http://localhost:5173', 
  origin: '*', // Allow requests from this origin   https://evote-1.onrender.com
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));

// Homepage route
app.get('/', (req, res) => {
  res.send('Voting System');
});

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/dashboard', dashboardRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
