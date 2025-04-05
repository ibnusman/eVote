import React, { useState } from 'react';
import { User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';



function Header() {
  const [showMenu, setShowMenu] = useState(false);
  // const token = localStorage.getItem("token")
  //  const role = localStorage.getItem("role")
  const navigate = useNavigate(); // hook for navigation

  const toggleMenu = () => setShowMenu(!showMenu);

  const handleLogout =()=>{
    localStorage.removeItem("token");
    localStorage.removeItem("role");
   navigate("/login");
  }

  return (
    <div>
      {/* Header Section */}
      <header className="bg-white shadow-md p-4 flex justify-between items-center w-full">
        <h1 className="text-2xl font-bold text-gray-800">Welcome to e-vote</h1>
        <div className="relative">
          <User
            size={30}
            onClick={toggleMenu}
            className="cursor-pointer text-gray-600 hover:text-gray-800 transition-colors"
          />
          {/* Dropdown Menu */}
          {showMenu && (
           <ul className="absolute right-0 mt-2 w-40 bg-white border rounded-lg shadow-lg text-sm text-black z-10">
              <li className="p-2 hover:bg-gray-100 cursor-pointer">Profile</li>
              <li className="p-2 hover:bg-gray-100 cursor-pointer">Settings</li>
              <li 
                className="p-2 hover:bg-gray-100 cursor-pointer text-red-600 font-medium" 
                onClick={handleLogout}
              >
                Logout
              </li>
            </ul>
          )}
        </div>
      </header>

      </div>
      )
}


export default Header;
