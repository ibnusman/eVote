import React from "react";
import { TwoFAForm } from "../components/TwoFAForm";

function VerifyUser() {
  return (
    <div
      className="flex flex-col items-center justify-center h-screen bg-gray-900 bg-cover bg-no-repeat bg-center overflow-hidden"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1491895200222-0fc4a4c35e18?q=80&w=3174&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
      }}
    >
      {/* Overlay for text readability */}
      <div className="absolute inset-0 bg-black opacity-20"></div>

      {/* Verify Content */}
      <div className="relative z-10 w-full max-w-[2688px] mx-auto px-4 sm:px-6 flex flex-col items-center justify-center h-full">
        <h2 className="text-2xl sm:text-3xl font-semibold text-white text-center mb-3 sm:mb-4 drop-shadow-lg">
         Email verification
        </h2>
        <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 max-w-lg w-full space-y-3">
          <TwoFAForm />
        </div>
      </div>
    </div>
  );
}

export default VerifyUser;
