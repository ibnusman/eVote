import axios from "axios";
import React from "react";
import { useState } from "react";
import {useNavigate} from 'react-router-dom'

export function ChangePasswordForm() {
    const navigate = useNavigate();
    const [formData,setFormData] = useState({
        email: "",
        pass: ""
    });
    const [message,setMessage] = useState("");

 const handleChange = (e) =>{
    const {name,value} = e.target;

    setFormData((prevState)=>({...prevState,[name]:value}))
 }

 const handleSubmit = async (e)=>{
     e.preventDefault();

     try {
        const response = await axios.post("http://localhost:3000/api/auth/changePassword",formData)
        if(response.status === 200){
            setMessage(" Password Changed succsfully  Redirecting to login...")

            setTimeout(() => {
                navigate('/login');
            }, 3000);

            
        }
        
     } catch (error) {
        if(error.response)
        {
            setMessage(error.response.data.message)
        }
        else{
            setMessage("Server Error, try again")
        }
     }
 }


    return(
        <>
          <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 bg-white shadow-xl rounded-2xl space-y-6 mt-10"> 
                <div>
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <input 
                        type="text"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="mt-1 p-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Password</label>
                    <input 
                        type="password"
                        name="pass"
                        value={formData.pass}
                        onChange={handleChange}
    className="mt-1 p-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                    />
                </div>

                {message && <div className="text-red-500">{message}</div>}

                <button 
                    type="submit"
                    className="w-full bg-red-500 text-black py-3 px-4 rounded-lg hover:bg-blue-600 transition-colors"
                >
                    Change Password
                </button>
            </form>
        
        </>
    )
}
