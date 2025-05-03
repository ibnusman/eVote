import React, { useEffect, useState } from "react";
import { Plus, X } from "lucide-react";
import axios from "axios";

export const AddElection = () => {
  const [message, setMessage] = useState("");
  const [add, setAdd] = useState(false);
  const [userRole,setUserRole] = useState ("");
  const token = localStorage.getItem("token");
  const roles = localStorage.getItem("role");
  const [adminWork,setAdminWork] = useState(false);
  const [formData, setFormData] = useState({
    position: "",
    category: "",
    description: "",
    startDate: "",
    endDate: "",
  });


 useEffect(() => {
    if (roles) {
      setUserRole(roles); 
    }
  }, []); 

  // Set adminWork based on role change
  useEffect(() => {
    if (userRole === 'admin') {
      setAdminWork(true);  
    } else {
      setAdminWork(false); 
    }
  }, [userRole]); 

  const handleClick = () => setAdd(!add);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };
 
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3000/api/dashboard/createElection",
        formData, {headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        }}
      );
      setMessage(`${response.data.message}`);
      // Reset form on success
      setFormData({
        position: "",
        category: "",
        description: "",
        startDate: "",
        endDate: "",
      });
      // Clear message after 3 seconds
      setTimeout(() => setMessage(""), 3000);
    } catch (error) {
      setMessage("Error creating election. Please try again.");
      console.error(error);
      setTimeout(() => setMessage(""), 3000);
    }
  };

  return (
    <div className="w-full">
      { adminWork && (   <section className="mb-8 w-full">
                <h2 className="text-xl font-semibold text-black-700 mb-4">Create a New Election</h2>
                <div className="bg-white p-6 rounded-lg shadow-md w-full">
                 
             
      <button
        onClick={handleClick}
        className="flex items-center justify-center bg-blue-500 text-black py-2 px-4 rounded-lg text-lg hover:bg-blue-600 transition-all mb-4"
      >
        {add ? <X size={24} /> : <Plus size={24} className="mr-2" />}
        {add ? "Close" : "Add Election"}
      </button>

         </div>
              </section>
)}

      {add && (
        <form
          onSubmit={handleSubmit}
          className="space-y-4 bg-gray-100 p-6 rounded-lg shadow-md w-full"
        >
          {message && (
            <div
              className={
                message.includes("Error") ? "text-red-500" : "text-green-500"
              }
            >
              {message}
            </div>
          )}
          <div>
            <label htmlFor="position" className="block text-sm font-medium">
              Position
            </label>
            <select
              id="position"
              name="position"
              value={formData.position}
              onChange={handleChange}
              className="block w-full p-2 border rounded"
            >
              <option value="">Select Position</option>
              <option value="President">President</option>
              <option value="Vice President">Vice President</option>
            </select>
          </div>

          <div>
            <label htmlFor="category" className="block text-sm font-medium">
              Category
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="block w-full p-2 border rounded"
            >
              <option value="">Select Category</option>
              <option value="State">State</option>
              <option value="School of Science">School of Science</option>
            </select>
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description || ""}
              onChange={handleChange}
              className="block w-full p-2 border rounded"
            />
          </div>
 
          <div>
            <label htmlFor="startDate" className="block text-sm font-medium">
              Start Date
            </label>
            <input
              id="startDate"
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              className="block w-full p-2 border rounded"
            />
          </div>

          <div>
            <label htmlFor="endDate" className="block text-sm font-medium">
              End Date
            </label>
            <input
              id="endDate"
              type="date"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
              className="block w-full p-2 border rounded"
            />
          </div>

          <button
            type="submit"
            className="mt-4 bg-blue-500 text-black py-2 px-4 rounded-lg hover:bg-blue-600 transition-all"
          >
            Submit Election
          </button>
        </form>
      )}
    </div>
  );
};
