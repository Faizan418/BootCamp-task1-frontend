import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000", // ❗ /api HATA DO
  withCredentials: true,
});

export default api;
