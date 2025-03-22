import React, { useState } from 'react';
import { User } from 'lucide-react';


function Header() {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => setShowMenu(!showMenu);

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
              <li className="p-2 hover:bg-gray-100 cursor-pointer">Logout</li>
            </ul>
          )}
        </div>
      </header>

      </div>
      )
}


export default Header;
