import axios from "axios";
import React, { useState } from "react";

export function ForgetPassword() {
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setEmail(e.target.value); // Directly update the email state
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(""); // Clear previous errors before making a request

        try {
            const response = await axios.post('http://localhost:3000/api/auth/forgetPassword', { email }); // Pass email as an object
            console.log(response.data);
        } catch (error) {
            console.error(error);
            setError("Invalid email");
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
                    {error && <div className="text-red-500 mt-2">{error}</div>}
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
