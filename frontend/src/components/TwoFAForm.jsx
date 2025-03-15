import axios from "axios";
import React from "react";
import { useState } from "react";


export function  TwoFA () {
    const [formData,setFormData] = useState({
        smsOTP: "",
        emailOTP: ""
    })
    const [message,setMessage] = useState("")
                            
    const handleChange = (e) => { 
        const {name,value} = e.target;
       setFormData((prevState)=>({ ...prevState,[name]:value}))

    }

    const handleSubmit= async (e)=> {
          e.preventDefault();

          try {
            const response = await axios.post("http://localhost:3000/api/auth/2fa",formData)
            if(response.status === 200)
            {
                    setMessage(response.data.message)
            }
            console.log(response.data);
          } catch (error) {
            console.log(" Error Verifying OTP",error.data)
          }
    }

    return (
        <>
     <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 bg-white shadow-xl rounded-2xl space-y-6 mt-10"> 
                <div>
                    <label className="block text-sm font-medium text-gray-700">smsOTP</label>
                    <input 
                        type="text"
                        name="smsOTP"
                        value={formData.smsOTP}
                        onChange={handleChange}
                        className="mt-1 p-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">emailOTP</label>
                    <input 
                        type="text"
                        name="emailOTP"
                        value={formData.emailOTP}
                        onChange={handleChange}
                        className="mt-1 p-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                 <button 
                    type="submit"
                    className="w-full bg-red-500 text-red py-3 px-4 rounded-lg hover:bg-blue-600 transition-colors"
                >
                    Verify
                </button>

</form>
        </>
    )




}
