import axios from 'axios';

const api = axios.create({
    //baseURL: "http://localhost:3000/api",
    baseURL: "https://work-nexus-backend-production.up.railway.app/api",
    
});

export const googleAuth = (code) => api.get(`auth/google?code=${code}`);
