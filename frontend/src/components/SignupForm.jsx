import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function SignupForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fname: "",
    sname: "",
    email: "",
    phone: "",
    username: "",
    pass: "",
  });
  const [message, setMessage] = useState("");
  const [inputCheck, setinputCheck] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
   const regPhone = /^(?:\+\d*|\d+)$/;

  if (name === "phone" && !regPhone.test(value)) {
    setinputCheck("Phone number must start with + or contain only digits");
  } else {
    setinputCheck(""); 
  }


    
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);

    const passwordRules = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&*()?])[A-Za-z\d@#$%^&*()?]{8,}$/;
    const checkPasswordRules = passwordRules.test(formData.pass);

    if (checkPasswordRules) {
        try {
            const response = await axios.post(
                "https://evote-xuw7.onrender.com/api/auth/register",
                formData,
                {
                    headers: { "Content-Type": "application/json" },
                }
            );
            console.log(response.data);
            setMessage(response.data.message);

            setTimeout(() => {
                navigate("/vu",{ state: { from: "/register" } });
            }, 3000);

        } catch (error) {
            console.error("Error adding user:", error);

            if (error.response && error.response.data) {
                setMessage(error.response.data.message);
            } else {
                setMessage("Server Error");
            }
        }
    } else {
        setMessage("Password must be at least 8 characters long and include at least one uppercase letter, one number, and one special character.");
    }
};


  return (
    <>
      <form onSubmit={handleSubmit} className="p-6 bg-white shadow-xl rounded-2xl space-y-4">
        {message && (
          <div
            className={`text-center p-2 rounded-lg ${
              message.includes("Error")
                ? "text-red-600 bg-green-100"
                : "text-red-600 bg-green-100"
            }`}
            role="alert"
          >
            {message}
          </div>
        )}

        {/* First Name and Second Name */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              First Name
            </label>
            <input
              type="text"
              name="fname"
              value={formData.fname}
              onChange={handleChange}
              className="mt-1 p-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Last Name
            </label>
            <input
              type="text"
              name="sname"
              value={formData.sname}
              onChange={handleChange}
              className="mt-1 p-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
              required
            />
          </div>
        </div>

        {/* Email (Full-Width) */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="mt-1 p-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
            required
          />
        </div>

        {/* Phone and Username */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Phone
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="mt-1 p-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
              required
            />
           <p className="text-red-500">{inputCheck}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="mt-1 p-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
              required
            />
          </div>
        </div>

        {/* Password (Full-Width) */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            type="password"
            name="pass"
            value={formData.pass}
            onChange={handleChange}
            className="mt-1 p-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full text-center bg-black text-black py-3 px-6 rounded-xl border-2 border-black hover:bg-gray-800 transition-all duration-300"
        >
          Sign Up
        </button>
      </form>
    </>
  );
}
