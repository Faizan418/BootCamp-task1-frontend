import axios from "axios";

export const api = axios.create({
    baseURL:"https://expanse-tracker-backend-alpha.vercel.app/",
    // baseURL:"http://localhost:5000",
    
    withCredentials: true
})