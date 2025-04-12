import axios from "axios";
import React, { useEffect, useState } from "react";
import { Plus, X } from "lucide-react";
import {useParams} from "react-router-dom"
export const AddCandidateForm = () => {
  const [adminWork,setAdminWork] = useState(false);
const {electionId} = useParams();
  const [formData, setFormData] = useState({
    name: "",
    party: "",
    about: "",
    image: "",
   electionId: "", 
  });
 const [add, setAdd] = useState(false);
  const [message, setMessage] = useState("");
 const handleClick = () => setAdd(!add);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };
useEffect(()=>{
  const roles = localStorage.getItem("role");
  if(roles == "admin")
  {
    setAdminWork(true);
  }


  }, []);

console.log("Election ID from URL:", electionId); 

const handleSubmit = async (e) => {
  e.preventDefault();
console.log("Election ID from URL:", electionId); 
  // Basic client-side validation
  if (!formData.name) {
    setMessage("Name is required");
    setTimeout(() => setMessage(""), 3000);
    return;
  }

  const finalFormData = {
    ...formData,
    electionId: electionId, // ✅ this ensures it’s present when sending
  };

  console.log("Submitting finalFormData:", finalFormData); // Optional debug

  try {
    const response = await axios.post(
      "http://localhost:3000/api/dashboard/addcandidate",
      finalFormData
    );

    setMessage(response.data.message);
    setTimeout(() => setMessage(""), 3000);

    setFormData({
      name: "",
      party: "",
      about: "",
      image: "",
      electionId, // keep it for next form use
    });
  } catch (error) {
    setMessage(error.response?.data?.message || "Error adding candidate");
    setTimeout(() => setMessage(""), 3000);
  }
};

  return (
    <div className="w-full">
     
      {adminWork && ( 
          <section className="mb-8 w-full">
              <h2 className="text-xl font-semibold text-gray-700 mb-4">Add candidate</h2>
              <div className="bg-white p-6 rounded-lg shadow-md w-full">
             
            
      <button
        onClick={handleClick}
        className="flex items-center justify-center bg-blue-500 text-black py-2 px-4 rounded-lg text-lg hover:bg-blue-600 transition-all mb-4"
      >
        {add ? <X size={24} /> : <Plus size={24} className="mr-2" />}
        {add ? "Close" : "Add Candidate"}
      </button>
      </div>
      </section>
)}
      {add && (
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Message */}
        {message && (
          <div
            className={`p-2 rounded text-center ${
              message.includes("successfully")
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {message}
          </div>
        )}

        {/* Name */}
        <div>
          <label htmlFor="name" className="text-gray-700 font-semibold mb-2 block">
            Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter candidate name"
          />
        </div>

        {/* Party */}
        <div>
          <label htmlFor="party" className="text-gray-700 font-semibold mb-2 block">
            Party
          </label>
          <input
            type="text"
            name="party"
            value={formData.party}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter party affiliation"
          />
        </div>

        {/* About */}
        <div>
          <label htmlFor="about" className="text-gray-700 font-semibold mb-2 block">
            About
          </label>
          <textarea
            name="about"
            value={formData.about}
            onChange={handleChange}
            spellCheck="true"
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 h-24"
            placeholder="Describe the candidate"
          />
        </div>

        {/* Image URL */}
        <div>
          <label htmlFor="image" className="text-gray-700 font-semibold mb-2 block">
            Image URL
          </label>
          <input
            type="text"
            name="image"
            value={formData.image} // Fixed typo (was formData.value)
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Paste image URL"
          />
          <p className="text-sm text-gray-500 italic mt-1">
            Kindly upload the image to a website and share the URL. Sample: <a href="https://imagekit.io/tools/image-share/" target="_blank" className="text-blue-500 hover:underline">ImageKit</a>
          </p>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-black p-2 rounded hover:bg-blue-600 transition-colors disabled:bg-gray-400"
          disabled={!formData.name} // Disable if name is empty
        >
          Add Candidate
        </button>
      </form>)}
    </div>
  );
};
