import React,{useState} from "react"
import axios from 'axios'

export function Signup() {
    const[fromData,setFormData] = useState({
        fname:"",
        sname:"",
        email:"", 
        phone:"", 
        username:"", 
        pass:""
    })

    const handleChange = (e) =>{
        const {name,value} = e.target;
        setFormData((prevState) => ({...prevState,[name]:value}));
    };

    const handleSubmit = async (e) =>{
       e.preventDefault();

       try {
        
       } catch (error) {
        console.error("Error adding user")
        
       }
    }
    return (
        <>
        <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 bg-white shadow-xl rounded-2xl space-y-6 mt-10"> 
  <div>
    <label className="block text-sm font-medium text-gray-700">First Name</label>
    <input 
      type="text"
      name="fname"
      value={FormData.fname}
      onChange={handleChange}
      className="mt-1 p-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>

  <div>
    <label className="block text-sm font-medium text-gray-700">Second Name</label>
    <input 
      type="text"
      name="sname"
      value={FormData.sname}
      onChange={handleChange}
      className="mt-1 p-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>

  <div>
    <label className="block text-sm font-medium text-gray-700">Email</label>
    <input 
      type="email"
      name="email"
      value={FormData.email}
      onChange={handleChange}
      className="mt-1 p-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>

  <div>
    <label className="block text-sm font-medium text-gray-700">Phone</label>
    <input 
      type="text"
      name="phone"
      value={FormData.phone}
      onChange={handleChange}
      className="mt-1 p-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>

  <div>
    <label className="block text-sm font-medium text-gray-700">Username</label>
    <input 
      type="text"
      name="username"
      value={FormData.username}
      onChange={handleChange}
      className="mt-1 p-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>

  <div>
    <label className="block text-sm font-medium text-gray-700">Password</label>
    <input 
      type="password"
      name="pass"
      value={FormData.pass}
      onChange={handleChange}
      className="mt-1 p-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>

  <button 
    type="submit"
    className="w-full bg-red-500 text-red py-3 px-4 rounded-lg hover:bg-blue-600 transition-colors"
  >
    Sign Up
  </button>
</form>


        </>
    )
}
