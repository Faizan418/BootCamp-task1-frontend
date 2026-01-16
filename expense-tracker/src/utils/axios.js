import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api", // backend API base URL
  withCredentials: true,
});

export default api;
