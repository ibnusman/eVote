import express from 'express';
import 'dotenv/config'
import bodyParser from 'body-parser'


const port = process.env.PORT;
const app = express()

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function (req, res) {
  res.send('Voting System')

})


app.get('/register', function (req, res) {

  const email = req.body.email;
  const username = req.body.username;
  const password = req.body.password;


  console.log(`your username is ${username} and password ${password}`)
  res.send('Registration page')

})


app.listen(port,() =>{
console.log(`Listening on port ${port}`)

});
