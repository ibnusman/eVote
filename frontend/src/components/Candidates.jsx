import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useParams} from 'react-router-dom'


import React,{useState,useEffect} from "react";
import { FaVoteYea } from "react-icons/fa"; // Icon library - install it



export function Candidates (){
  const userID = localStorage.getItem("userID");
const {electionId} = useParams();
const [notVoted,setnotVoted] = useState(true)
    const [candidates,setCandidates] = useState([])
  const [votes, setVotes] = useState({}); // Store votes per candidate

   console.log(`the user ID is ${userID}`); 
const deleteCandidate = async(id) =>{
  const confrimDelete = window.confirm("Are you sure?");
  if(!confrimDelete) return;
  console.log(id);
  try{
    const delCandidate = await axios.delete(`http://localhost:3000/api/dashboard/deleteCandidate/${id}`);
    console.log(delCandidate.data.message);
    toast.success("Candidate deleted successfully!");
    setCandidates((prevCandidate)=>prevCandidate.filter((candidate)=>candidate._id !== id));
  }catch(error){
    console.log(error)
  }

}

        
        useEffect(() => {
       
    const getCandidates = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/dashboard/candidatelist/${electionId}`);
        setCandidates(response.data.candidateList);

        // Initialize votes state (to store votes per candidate)
        const initialVotes = {};
        response.data.candidateList.forEach((candi) => {
          initialVotes[candi._id] = 0; 
        });
        setVotes(initialVotes);
      } catch (error) {
        console.log("Error fetching candidates:", error);
      }
    };

    getCandidates();
  }, []);
       const handleClick = async (candidateId) => {
        setnotVoted(false);
         toast.success("Voted successfully!");
    // Update UI immediately (optimistic update)
    setVotes((prevVotes) => ({
      ...prevVotes,
      [candidateId]: prevVotes[candidateId] + 1, 
    }));

    try {
      // Send vote to backend
      const response = await axios.post("http://localhost:3000/api/dashboard/vote", {
        _id: candidateId, 
        votes: 1, 
      });

      console.log(response.data.message);
    } catch (error) {
      console.error("Error voting:", error);
    }
  };
        
       return (
    <div className="p-6">
      <h2 className="text-xl font-semibold text-gray-700 mb-4">Candidates</h2>
      {candidates.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {candidates.map((candi) => (
           
            <div
              key={candi._id || candi.name} // Use _id if available, fallback to name if not found
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
                Votes: {votes[candi._id]}
              </p>
             <button
             onClick={()=>deleteCandidate(candi._id)}
             >

                Delete
             </button>
             { notVoted &&
              <button
                onClick={() => handleClick(candi._id)}
                className="mt-3 flex items-center gap-2 bg-green-500 text-black px-4 py-2 rounded-lg border border-green-600 hover:bg-green-600 transition-colors focus:outline-none focus:ring-2 focus:ring-green-400"
              >
                <FaVoteYea /> Vote
              </button>
              }
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-center">No candidates found</p>
      )}
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
    
  );
}
