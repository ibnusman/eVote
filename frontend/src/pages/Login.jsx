import React from 'react'
import { Link } from 'react-router-dom'
import { LoginForm } from '../components/LoginForm'

function Login() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-2xl shadow-xl text-center space-y-4">
        <LoginForm />
         <p className="text-gray-700 text-sm mt-4">
         
          <Link to='/forgetpassword' className="text-blue-500 hover:underline">Forget Password?</Link>
        </p>
        <p className="text-gray-700 text-sm mt-4">
          Don't have an account?{" "}
          <Link to='/register' className="text-blue-500 hover:underline">Register</Link>
        </p>
      </div>
    </div>
  )
}

export default Login
