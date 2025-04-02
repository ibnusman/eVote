import axios from "axios";
import React, { useEffect, useState } from "react";
import { format } from "date-fns"; // Import format function
import { Link } from "react-router";

export const ViewElection = () => {
  const [elections, setElections] = useState([]);
  const token = localStorage.getItem("token");
      console.log(token);


  useEffect(() => {
    const fetchElection = async () => {
    
      try {
        const response = await axios.get("http://localhost:3000/api/dashboard/electionList", 
          {headers:{  "Authorization": `Bearer ${token}`},

        });
        console.log("API Response:", response.data);
        setElections(response.data.storedElections);
      } catch (error) {
        console.error("Error fetching elections:", error);
      }
    };

    fetchElection();
  }, []);

  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-700 mb-4">Election List</h2>
      {elections.length === 0 ? (
        <span className="text-gray-500">No elections available</span>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {elections.map((election, index) => (
            <Link to ='/dashboard/addcandidate' >
            <div
              key={index}
              className="bg-white p-4 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow"
            >
              <h3 className="text-lg font-medium text-gray-800">{election.position}</h3>
              <p className="text-gray-600">{election.category}</p>
              <p className="text-gray-500 text-sm mt-2">{election.description || "No description"}</p>
              <div className="mt-3 text-sm text-gray-500">
                <span>Start: {format(new Date(election.startDate), "MMMM d, yyyy")}</span>
                <br />
                <span>End: {format(new Date(election.endDate), "MMMM d, yyyy")}</span>
              </div>
            </div>
            </Link>

          ))}
        </div>
      )}
    </div>
  );
};
