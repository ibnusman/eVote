import axios from "axios";
import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { Edit, Trash2 } from "lucide-react";

export const ViewElection = () => {
  const [elections, setElections] = useState([]);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();



  useEffect(() => {
    const fetchElection = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/dashboard/electionList", {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log("API Response:", response.data);
        setElections(response.data.storedElections);
      } catch (error) {
        console.error("Error fetching elections:", error);
      }
    };

    fetchElection();
  }, [token]);

  const handleDelete = async (id) => {
    console.log("testing goge",id)

    try{
    const delresponse = await axios.delete(`http://localhost:3000/api/dashboard/deleteElection/${id}`);
      console.log(delresponse);
          setElections((prevElections) => prevElections.filter((election) => election._id !== id));

    }
    catch(error){
      console.log(error);
    }
  }

  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-700 mb-4">Election List</h2>
      {elections.length === 0 ? (
        <span className="text-gray-500">No elections available</span>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {elections.map((election) => (
            <div
              key={election._id}
              className="bg-white p-4 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow relative group cursor-pointer"
              onClick={() => navigate(`/dashboard/candidates/${election._id}`)}
            >
              <h3 className="text-lg font-medium text-gray-800">{election.position}</h3>
              <p className="text-gray-600">{election.category}</p>
              <p className="text-gray-500 text-sm mt-2">{election.description || "No description"}</p>
              <div className="mt-3 text-sm text-gray-500">
                <span>Start: {format(new Date(election.startDate), "MMMM d, yyyy")}</span>
                <br />
                <span>End: {format(new Date(election.endDate), "MMMM d, yyyy")}</span>
              </div>

              {/* Edit & Delete Icons */}
              <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  title="Edit"
               
                  className="text-blue-500 hover:text-blue-700"
                >
                  <Edit size={18} />
                </button>
                <button
                  title="Delete"
               onClick={(e)=> {e.stopPropagation(); handleDelete(election._id);  }}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
