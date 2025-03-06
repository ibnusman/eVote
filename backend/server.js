import express from 'express';
import 'dotenv/config'
import bodyParser from 'body-parser'
import passport from 'passport';
// import LocalStrategy from 'passport-local'
import bcrypt from "bcryptjs";
import Signup from './model/signup';
const port = process.env.PORT;
const app = express()
//Set salt round
const salt = bcrypt.genSaltSync(10);
//Setting middleware
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

//homepage
app.get('/', function (req, res) {
  res.send('Voting System')

})

//registration page
app.get('/register', function (req, res) {

  //getting user detials on sign ups
  const {email,username,password} = req.body;


  //hashing password
const hash = bcrypt.hashSync(password, salt);
  console.log(`your email is ${email} username is ${username} and password ${hash}`)
  const newUser = new
  res.send('Registration page')

})


app.listen(port,() =>{
console.log(`Listening on port ${port}`)

});
