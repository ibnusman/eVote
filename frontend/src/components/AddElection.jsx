import React, { useState } from "react";
import { Plus, X } from "lucide-react";

export const AddElection = () => {
    const [add, setAdd] = useState(false);
    const [formData, setFormData] = useState({
        position: "",
        category: "",
        description: "",
        startDate: "",
        endDate: ""
    });

    const handleClick = () => {
        setAdd(!add);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
    };

    return (
        <div>
            <button
                onClick={handleClick}
                className="flex items-center justify-center bg-blue-500 text-black py-2 px-4 rounded-lg text-lg hover:bg-blue-600 transition-all mb-4"
            >
                {add ? <X size={24} /> : <Plus size={24} className="mr-2" />}
                {add ? "Close" : "Add Election"}
            </button>

            {add && (
                <form onSubmit={handleSubmit} className="space-y-4 bg-gray-100 p-6 rounded-lg shadow-md w-full max-w-xl mx-auto">
                    <div>
                        <label>Position</label>
                        <select name="position" value={formData.position} onChange={handleChange} className="block w-full p-2 border rounded">
                            <option value="">Select Position</option>
                            <option value="President">President</option>
                            <option value="Vice President">Vice President</option>
                        </select>
                    </div>

                    <div>
                        <label>Category</label>
                        <select name="category" value={formData.category} onChange={handleChange} className="block w-full p-2 border rounded">
                            <option value="">Select Category</option>
                            <option value="State">State</option>
                            <option value="School of Science">School of Science</option>
                        </select>
                    </div>

                    <div>
                        <label>Description</label>
                        <textarea name="description" value={formData.description} onChange={handleChange} className="block w-full p-2 border rounded"></textarea>
                    </div>

                    <div>
                        <label>Start Date</label>
                        <input type="date" name="startDate" value={formData.startDate} onChange={handleChange} className="block w-full p-2 border rounded" />
                    </div>

                    <div>
                        <label>End Date</label>
                        <input type="date" name="endDate" value={formData.endDate} onChange={handleChange} className="block w-full p-2 border rounded" />
                    </div>

                    <button type="submit" className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-all">
                        Submit Election
                    </button>
                </form>
            )}
        </div>
    );
};
