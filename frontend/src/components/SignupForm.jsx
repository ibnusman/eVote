import React, { useState } from "react";
import axios from 'axios';
import {useNavigate} from 'react-router-dom'


export function SignupForm() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        fname: "",
        sname: "",
        email: "", 
        phone: "", 
        username: "", 
        pass: ""
    });
    const [message,setMessage] = useState("")

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage(null); 
        try {
            const response = await axios.post("http://localhost:3000/api/auth/register", formData, {
                headers: { 'Content-Type': 'application/json' }
            });
            console.log(response.data);
            setMessage(`${response.data.message} Loading login page...`);
            setTimeout(() => {
                navigate('/login')
            }, 3000);
            
        } catch (error) {
            console.error("Error adding user", error.data);
            if(error.response.data){

            setMessage(error.response.data.message)
            }else{
                setMessage("Server Error")
            }
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
                        value={formData.fname}
                        onChange={handleChange}
                        className="mt-1 p-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Second Name</label>
                    <input 
                        type="text"
                        name="sname"
                        value={formData.sname}
                        onChange={handleChange}
                        className="mt-1 p-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <input 
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="mt-1 p-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Phone</label>
                    <input 
                        type="text"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="mt-1 p-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Username</label>
                    <input 
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        className="mt-1 p-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Password</label>
                    <input 
                        type="password"
                        name="pass"
                        value={formData.pass}
                        onChange={handleChange}
                        className="mt-1 p-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
             {message && <div className="text-red-500">{message}</div>}

                <button 
                    type="submit"
          className="block w-80 text-center bg-green-500 text-black py-3 px-6 rounded-xl hover:bg-green-600 transition"
                >
                    Sign Up
                </button>
            </form>
        </>
    )
}
