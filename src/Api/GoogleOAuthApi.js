import axios from 'axios';

const api = axios.create({
    //baseURL: "http://localhost:3000/api",
    //baseURL: "https://work-nexus-backend-production.up.railway.app/api",
    baseURL: "http://13.61.175.218:3000/api",  // deployed on AWS EC2 instance
    
});

export const googleAuth = (code) => api.get(`auth/google?code=${code}`);
