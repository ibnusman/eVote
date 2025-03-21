import React, { useState } from 'react';
import { User } from 'lucide-react';
import { AddElection } from '../components/AddElection';
import { ViewElection } from '../components/ViewElection';

function Dashboard() {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => setShowMenu(!showMenu);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
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

      {/* Main Content */}
      <main className="flex-grow p-6 w-full">
        {/* Add Election Section */}
        <section className="mb-8 w-full">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Create a New Election</h2>
          <div className="bg-white p-6 rounded-lg shadow-md w-full">
            <AddElection />
          </div>
        </section>

        {/* Placeholder for Election List */}
        <section className="w-full">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Your Elections</h2>
          <div className="bg-white p-6 rounded-lg shadow-md w-full">
            <p className="text-gray-500">No elections yet. Add one above!  </p> <ViewElection/>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white p-4 text-center text-gray-600 text-sm shadow-inner w-full">
        © 2025 e-vote. All rights reserved.
      </footer>
    </div>
  );
}

export default Dashboard;
