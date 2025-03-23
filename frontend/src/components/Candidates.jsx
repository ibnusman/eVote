import axios from "axios";
import { interval } from "date-fns";
import React,{useState,useEffect} from "react";



export function Candidates (){
    const [candidates,setCandidates] = useState([])

        
        useEffect(() => {

            const getCandidates= async ()=>{
          try {
            const response = await axios.get("http://localhost:3000/api/dashboard/candidatelist")
           setCandidates(response.data.candidateList);
          
          }catch(error){
            console.log(error)
          }
        }
        getCandidates()

        const Interval = setInterval(getCandidates,1000);
        return ()=>clearInterval(Interval);
        
        }, [candidates])
        
       
        

        
       return (
    <div className="p-6">
      <h2 className="text-xl font-semibold text-gray-700 mb-4">Candidates</h2>
      {candidates.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {candidates.map((candi) => (
            <div
              key={candi._id || candi.name} // Use _id if available, fallback to name
              className="bg-white p-4 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow flex flex-col items-center"
            >
              <img
                src={candi.image}
                alt={`${candi.name}'s photo`}
                className="w-24 h-24 rounded-full object-cover mb-3"
                onError={(e) => (e.target.src = "https://via.placeholder.com/150")} // Fallback image
              />
              <h3 className="text-lg font-medium text-gray-800 text-center">
                {candi.name}
              </h3>
              <p className="text-gray-600 text-sm text-center">{candi.party}</p>
              <p className="text-gray-500 text-sm text-center mt-2">
                {candi.about || "No description available"}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-center">No candidates found</p>
      )}
    </div>
  );
}
