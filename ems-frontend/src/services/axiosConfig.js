import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080",
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log("AXIOS TOKEN ATTACHED"); 
    } else {
      console.log("NO TOKEN FOUND");
    }

    return config;
  },
  (error) => Promise.reject(error)
);


export default api;
