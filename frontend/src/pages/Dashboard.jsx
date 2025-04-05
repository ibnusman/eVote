import React, { useState } from 'react';
import { User } from 'lucide-react';
import { AddElection } from '../components/AddElection';
import { ViewElection } from '../components/ViewElection';
import Header from '../components/Header';

function Dashboard() {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => setShowMenu(!showMenu);

  return (
    <div>
   <Header/>

      {/* Main Content */}
      <main className="flex-grow p-6 w-full">
        {/* Add Election Section */}
        {/* <section className="mb-8 w-full">
          <h2 className="text-xl font-semibold text-black-700 mb-4">Create a New Election</h2>
          <div className="bg-white p-6 rounded-lg shadow-md w-full"> */}
            <AddElection />
          {/* </div>
        </section> */}

        {/* Placeholder for Election List */}
        <section className="w-full">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Current Elections</h2>
          <div className="bg-white p-6 rounded-lg shadow-md w-full">
            <ViewElection/>
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
