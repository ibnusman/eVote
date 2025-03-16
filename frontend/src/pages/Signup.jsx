import React from "react";
import { Link } from 'react-router-dom'
import { SignupForm } from "../components/SignupForm";

function Signup() {
  return (
    <div className="flex flex-col items-center mt-6">
       <SignupForm/>
       <p className="mt-4 text-gray-700 text-sm">
         Already have an account?{" "}
         <Link to='/login' className="text-blue-500 hover:underline">
           Login
         </Link>
       </p>
    </div>
  )
}

export default Signup;
