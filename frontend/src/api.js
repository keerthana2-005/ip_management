import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000'; // Backend server

export const signupUser = async (userData) => {
    return await axios.post(`${API_BASE_URL}/signup`, userData);
};

export const verifyCode = async (email, code) => {
    return await axios.post(`${API_BASE_URL}/verify`, { email, code });
};
