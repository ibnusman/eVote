import express from 'express';
import 'dotenv/config'
import bodyParser from 'body-parser'
import passport from 'passport';
// import LocalStrategy from 'passport-local'
import bcrypt from "bcryptjs";

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

  const email = req.body.email;
  const username = req.body.username;
  const password = req.body.password;
const hash = bcrypt.hashSync(password, salt);
  console.log(`your username is ${username} and password ${hash}`)
  res.send('Registration page')

})


app.listen(port,() =>{
console.log(`Listening on port ${port}`)

});
