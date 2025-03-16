import axios from 'axios';

const API_BASE_URL = "http://localhost:3000/api/auth";

// Create a reusable Axios instance
const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

// Wrapper function for POST requests
export const postRequest = async (url, data) => {
    try {
        const response = await api.post(url, data);
        return response;
    } catch (error) {
        throw error.response?.data?.message || "An error occurred";
    }
};
