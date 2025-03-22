import axios from "axios";
import React, { useState } from "react";

export const AddCandidateForm = ({ electionId }) => {
  const [formData, setFormData] = useState({
    name: "",
    party: "",
    about: "",
    image: "",
    electionId: electionId, // Passed from parent (e.g., /election/123/candidates)
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic client-side validation
    if (!formData.name) {
      setMessage("Name is required");
      setTimeout(() => setMessage(""), 3000);
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/api/dashboard/addcandidate",
        formData
      );
      setMessage(response.data.message);
      setTimeout(() => setMessage(""), 3000);
      setFormData({
        name: "",
        party: "",
        about: "",
        image: "",
        electionId: electionId, // Preserve electionId
      });
    } catch (error) {
      setMessage(error.response?.data?.message || "Error adding candidate");
      setTimeout(() => setMessage(""), 3000);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Add Candidate</h3>
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
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition-colors disabled:bg-gray-400"
          disabled={!formData.name} // Disable if name is empty
        >
          Add Candidate
        </button>
      </form>
    </div>
  );
};
