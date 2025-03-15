import axios from "axios";
import React, { useState } from "react";

export function LoginForm() {
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });
    const [message,setMessage] = useState("");

   // State for storing error messages

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage(null);  // Clear previous errors before making a request

        try {
            const response = await axios.post('http://localhost:3000/api/auth/login', formData);
            if(response.status === 200)
            {
                setMessage(response.data.message)
            }
            console.log(response.data);
            // Redirect user or save token here if login is successful
        } catch (error) {
            if(error.response)
            {
                setMessage(error.response.data.message);
            }else{
            console.error(error);
            setMessage("Server Error. Please try again");
            }
        }
    };
    
    return (
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
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
    className="mt-1 p-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                    />
                </div>

                {message && <div className="text-red-500">{message}</div>}

                <button 
                    type="submit"
                    className="w-full bg-red-500 text-white py-3 px-4 rounded-lg hover:bg-blue-600 transition-colors"
                >
                    Login
                </button>
            </form>
        </>
    );
}
