import axios from "axios";
import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { Edit, Trash2 } from "lucide-react";
import { AddElection } from "./AddElection"; // Import AddElection component

export const ViewElection = () => {
  const [elections, setElections] = useState([]);
  const [allElections, setAllElections] = useState([]);
  const [sort, setSort] = useState("");
  const [search, setSearch] = useState("");
  const [editData, setEditData] = useState(null);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const fetchElection = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/dashboard/electionList",
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setElections(response.data.storedElections);
      setAllElections(response.data.storedElections);
    } catch (error) {
      console.error("Error fetching elections:", error);
    }
  };

  useEffect(() => {
    fetchElection();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `http://localhost:3000/api/dashboard/deleteElection/${id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchElection();
    } catch (error) {
      console.log(error);
    }
  };

  const sorting = (e) => {
    const selected = e.target.value;
    setSort(selected);

    if (selected === "") {
      setElections(allElections);
    } else {
      const filtered = allElections.filter(
        (item) => item.position === selected
      );
      setElections(filtered);
    }
  };

  const searchElection = (e) => {
    const sValue = e.target.value;
    setSearch(sValue);

    if (sValue === "") {
      setElections(allElections);
    } else {
      const seElec = allElections.filter((elec) =>
        elec.position.toLowerCase().includes(sValue.toLowerCase())
      );
      setElections(seElec);
    }
  };

  const handleEdit = (election) => {
    setEditData(election);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div>
      <AddElection editData={editData} onElectionSaved={fetchElection} />

      <h2 className="text-xl font-semibold text-gray-700 mb-4">Election List</h2>

      <label htmlFor="search" className="block text-sm font-medium text-gray-600 mb-1">
        Search by Position
      </label>
      <input
        type="text"
        name="search"
        id="search"
        value={search}
        onChange={searchElection}
        placeholder="e.g. President"
        className="w-full sm:w-64 px-4 py-2 mb-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <div className="mb-6">
        <label htmlFor="positions" className="block text-sm font-medium text-gray-600 mb-1">
          Filter by Positions
        </label>
        <select
          onChange={sorting}
          name="position"
          id="positions"
          value={sort}
          className="w-full sm:w-64 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="">All</option>
          <option value="President">President</option>
          <option value="Vice President">Vice President</option>
        </select>
      </div>

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
              <p className="text-gray-500 text-sm mt-2">
                {election.description || "No description"}
              </p>
              <div className="mt-3 text-sm text-gray-500">
                <span>
                  Start: {format(new Date(election.startDate), "MMMM d, yyyy")}
                </span>
                <br />
                <span>
                  End: {format(new Date(election.endDate), "MMMM d, yyyy")}
                </span>
              </div>

              <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  title="Edit"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleEdit(election);
                  }}
                  className="text-blue-500 hover:text-blue-700"
                >
                  <Edit size={18} />
                </button>
                <button
                  title="Delete"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(election._id);
                  }}
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
