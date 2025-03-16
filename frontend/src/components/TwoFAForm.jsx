import { useState } from "react";
import axios from "axios";
import {useNavigate} from 'react-router-dom'

export function TwoFAForm() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ emailOTP: "" }); // Correctly initializing as an object
    const [message, setMessage] = useState("");
                            
    const handleChange = (e) => { 
       setFormData({ ...formData, [e.target.name]: e.target.value }); // Properly handling state update
    }

    const handleSubmit = async (e) => {
          e.preventDefault();
           setMessage("");

          try {
            const response = await axios.post("http://localhost:3000/api/auth/2fa", formData); // Sending data as an object
            if(response.status === 200) {
                setMessage(response.data.message)
                navigate('/changepassword')
            }
            console.log(response.data);
          } catch (error) {
            console.log("Error Verifying OTP", error.response?.data?.message || error.response);
            setMessage(error.response?.data?.message)
          }
    }

    return (
        <>
            <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 bg-white shadow-xl rounded-2xl space-y-6 mt-10"> 
                <div>
                    <label className="block text-sm font-medium text-gray-700">Email OTP</label>
                    <input 
                        type="text"
                        name="emailOTP"
                        value={formData.emailOTP}  // Accessing the value properly
                        onChange={handleChange}
                        className="mt-1 p-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                 <button 
                    type="submit"
                    className="w-full bg-red-500 text-black py-3 px-4 rounded-lg hover:bg-blue-600 transition-colors"
                >
                    Verify
                </button>

                {message && <div className="text-green-500 mt-4">{message}</div>}
            </form>
        </>
    )
}
