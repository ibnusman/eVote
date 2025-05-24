import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaVoteYea } from "react-icons/fa"; // Icon library - install it
import { useParams } from 'react-router-dom';

export function Candidates() {
  const voteStatus = localStorage.getItem("voteStatus") === "true"
  const { electionId } = useParams();
  const [voted, setVoted] = useState(voteStatus);  // Tracking if the user has voted
  const [candidates, setCandidates] = useState([]);
  const [votes, setVotes] = useState({}); // Store votes per candidate
  const [notVoted, setNotVoted] = useState(voteStatus === 'false'); // Only show vote button if user hasn't voted

useEffect(() => {
  const getCandidates = async () => {
    try {
      const response = await axios.get(`https://evote-xuw7.onrender.com/api/dashboard/candidatelist/${electionId}`);
      setCandidates(response.data.candidateList);

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

  // Check if the user has already voted for this election
  const checkVoteStatus = async () => {
    const userId = localStorage.getItem("userId");
    try {
      const response = await axios.post("https://evote-xuw7.onrender.com/api/dashboard/voteStatus", { id: userId });
      const userVoteData = response.data.userVote.voted || [];

      // Check this electionId exists in user's voted elections
      const hasVoted = userVoteData.some(vote => vote.electionId === electionId);
      setVoted(hasVoted);
      setNotVoted(!hasVoted);
    } catch (error) {
      console.error("Error checking vote status:", error);
    }
  };
  checkVoteStatus();
}, [electionId]);


const handleClick = async (candidateId) => {
  setVoted(true);
  setNotVoted(false);
  localStorage.setItem("voteStatus", "true"); 
  toast.success("Voted successfully!");

  setVotes((prevVotes) => ({
    ...prevVotes,
    [candidateId]: prevVotes[candidateId] + 1, 
  }));

  try {
    // Update user's voted elections
    await axios.post("https://evote-xuw7.onrender.com/api/dashboard/updateVote", {
      id: localStorage.getItem("userId"),
      electionId: electionId,  // Pass electionId to backend
    });
  } catch (error) {
    console.error("Error updating vote status:", error);
  }

  try {
    await axios.post("https://evote-xuw7.onrender.com/api/dashboard/vote", {
      _id: candidateId,
      votes: 1,
    });
  } catch (error) {
    console.error("Error voting:", error);
  }
};


  const deleteCandidate = async (id) => {
    const confirmDelete = window.confirm("Are you sure?");
    if (!confirmDelete) return;

    try {
      const delCandidate = await axios.delete(`https://evote-xuw7.onrender.com/api/dashboard/deleteCandidate/${id}`);
      console.log(delCandidate.data.message);
      toast.success("Candidate deleted successfully!");
      setCandidates((prevCandidate) => prevCandidate.filter((candidate) => candidate._id !== id));
    } catch (error) {
      console.log(error);
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
                <br />
                Votes: {votes[candi._id]}
              </p>
              <button
                onClick={() => deleteCandidate(candi._id)}
                className="mt-2 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
              >
                Delete
              </button>
              {notVoted && (
                <button
                  onClick={() => handleClick(candi._id)}
                  className="mt-3 flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-lg border border-green-600 hover:bg-green-600 transition-colors focus:outline-none focus:ring-2 focus:ring-green-400"
                >
                  <FaVoteYea /> Vote
                </button>
              )}
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
