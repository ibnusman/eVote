import React from "react";
import {Link} from 'react-router-dom'
import { SignupForm } from "../components/SignupForm";


function Signup() {
  return (
    <div>
       <SignupForm/>
       <p>Already have an account ? <Link to='login'>Login</Link></p>
    </div>
  )
}

export default Signup;
