import axios from "axios";
import React, { useEffect, useState } from "react";

export function ElectionResult() {
  const [election, setElection] = useState([]);

  useEffect(() => {
    const getResult = async () => {
      try {
        const result = await axios.get("http://localhost:3000/api/dashboard/result");
        setElection(result.data.message);
      } catch (error) {
        console.log("Error fetching results:", error);
      }
    };
    getResult();
  }, []);

  return (
    <div className="w-full">
      <h2 className="text-xl font-semibold text-gray-700 mb-4">Election Results</h2>
      {election.length > 0 ? (
        <div className="bg-white p-6 rounded-lg shadow-md w-full overflow-x-auto">
          <table className="min-w-full border-collapse border border-gray-200">
            <thead>
              <tr className="bg-green-50 text-gray-700">
                <th className="w-[300px] p-4 text-left border-b border-gray-200 font-semibold">Name</th>
                <th className="w-[200px] p-4 text-left border-b border-gray-200 font-semibold">Party</th>
                <th className="w-[100px] p-4 text-left border-b border-gray-200 font-semibold">Votes</th>
              </tr>
            </thead>
            <tbody>
              {election.map((elec) => (
                <tr key={elec._id} className="hover:bg-gray-50 transition-colors">
                  <td className="w-[300px] p-4 text-left border-b border-gray-200 text-gray-800">{elec.name}</td>
                  <td className="w-[200px] p-4 text-left border-b border-gray-200 text-gray-600">{elec.party || "N/A"}</td>
                  <td className="w-[100px] p-4 text-left border-b border-gray-200 text-gray-800">{elec.votes || 0}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-gray-500 text-center py-4">No election results found</p>
      )}
    </div>
  );
}

export default ElectionResult;
