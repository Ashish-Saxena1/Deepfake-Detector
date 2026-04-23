import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:8000';

export const analyzeMedia = async (file) => {
    const formData = new FormData();
    formData.append('file', file);

    try {
        const response = await axios.post(`${API_BASE_URL}/predict`, formData);
        return response.data;
    } catch (error) {
        console.error("API connection failed:", error);
        throw error;
    }
};