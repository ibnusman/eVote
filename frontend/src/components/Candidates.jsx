import axios from "axios";

import React,{useState,useEffect} from "react";
import { FaVoteYea } from "react-icons/fa"; // Icon library - install it



export function Candidates (){
    const [candidates,setCandidates] = useState([])
    const [vote,setVote] = useState(0)

        
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

        // const Interval = setInterval(getCandidates,1000);
        // return ()=>clearInterval(Interval);
        
        }, [])
        
       const handleClick = ()=>{
           setVote((prev)=>{
            const newVote = prev +1 
            console.log(newVote);
            return newVote;
       });
          
       }
        

        
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
              <button
                onClick={handleClick}
                className="mt-3 flex items-center gap-2 bg-green-500 text-black px-4 py-2 rounded-lg border border-green-600 hover:bg-green-600 transition-colors focus:outline-none focus:ring-2 focus:ring-green-400"
              >
                <FaVoteYea /> Vote
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-center">No candidates found</p>
      )}
    </div>
  );
}
