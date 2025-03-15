import axios from "axios";
import React, { useState } from "react";

export function ForgetPassword() {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        setEmail(e.target.value); // Directly update the email state
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage(""); // Clear previous errors before making a request

        try {
            const response = await axios.post('http://localhost:3000/api/auth/forgetPassword', { email }); // Pass email as an object
            console.log(response.data);
            if(response.status===200)
            {
                setMessage(response.data.message)
            }
        } catch (error) {
            if(error.response)
            {
                setMessage(error.response.data.message)
            }
            else
            {
            setMessage("Server Error. Please try again later.");

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
                        value={email}
                        onChange={handleChange}
                        className="mt-1 p-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                    />
                    {message && <div className="text-red-500 mt-2">{message}</div>}
                </div>

                <button 
                    type="submit"
                    className="w-full bg-blue-500 text-white py-3 px-4 rounded-lg hover:bg-blue-600 transition-colors"
                >
                    Submit
                </button>
            </form>
        </>
    );
}
