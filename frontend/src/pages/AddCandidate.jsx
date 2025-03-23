import React from "react";
import Dashboard from "./Dashboard";
import { AddCandidateForm } from "../components/AddCandidateForm";
import Header from "../components/Header";


function AddCandidate (){


    return(
        <>
    <Header/>
     <main className="flex-grow p-6 w-full">
            {/* Add Election Section */}
            <section className="mb-8 w-full">
              <h2 className="text-xl font-semibold text-gray-700 mb-4">Add candidate</h2>
              <div className="bg-white p-6 rounded-lg shadow-md w-full">
                     <AddCandidateForm/>
              </div>
            </section>
    
            {/* Placeholder for Election List */}
            <section className="w-full">
              <h2 className="text-xl font-semibold text-gray-700 mb-4">Candidates</h2>
              <div className="bg-white p-6 rounded-lg shadow-md w-full">
               
              </div>
            </section>
          </main>
   
        
        </>
    )
}


export default AddCandidate;
