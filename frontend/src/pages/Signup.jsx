import React from "react";
import { Link } from "react-router-dom";
import { SignupForm } from "../components/SignupForm";

function Signup() {
  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen bg-gray-900 bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1491895200222-0fc4a4c35e18?q=80&w=3174&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
      }}
    >
      {/* Overlay for text readability */}
      <div className="absolute inset-0 bg-black opacity-20"></div>

      {/* Signup Content */}
      <div className="relative z-10 w-full max-w-[2688px] mx-auto px-6">
        <h2 className="text-3xl font-semibold text-white text-center mb-6 drop-shadow-lg">
          Create Your Account
        </h2>
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-lg mx-auto">
          <SignupForm />
          <p className="mt-4 text-gray-700 text-sm text-center">
            Already have an account?{" "}
            <Link to="/login" className="text-gray-900 hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;
