import React, { useState } from 'react';
import { User } from "lucide-react";

function Dashboard() {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => setShowMenu(!showMenu);

  return (
    <div>
      {/* Profile Icon */}
      <h1>Welcome to e-vote</h1>
      <div className="absolute top-4 right-4">
        <User 
          size={30} 
          onClick={toggleMenu}
          className="cursor-pointer"
        />

        {/* Dropdown Menu */}
        {showMenu && (
          <ul className="mt-2 bg-white border rounded-lg shadow-lg text-sm text-black">
            <li className="p-2 hover:bg-gray-100 cursor-pointer">Profile</li>
            <li className="p-2 hover:bg-gray-100 cursor-pointer">Settings</li>
            <li className="p-2 hover:bg-gray-100 cursor-pointer">Logout</li>
          </ul>
        )}
      </div>
    </div>
  )
}

export default Dashboard;
