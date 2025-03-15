import React from 'react'
import { Link } from 'react-router-dom'

function Landing() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-6xl font-bold text-blue-600 text-center mb-6">Welcome to E-Vote</h1>
      <p className="text-gray-600 text-xl text-center mb-8">Your trusted online voting platform</p>
      
      <div className="flex flex-col items-center space-y-4">
        <Link 
          to='/login' 
          className="block w-80 text-center bg-blue-500 text-white py-3 px-6 rounded-xl hover:bg-blue-600 transition"
        >
          Login
        </Link>
        <Link 
          to='/register' 
          className="block w-80 text-center bg-green-500 text-white py-3 px-6 rounded-xl hover:bg-green-600 transition"
        >
          Sign Up
        </Link>
      </div>
    </div>
  )
}

export default Landing
