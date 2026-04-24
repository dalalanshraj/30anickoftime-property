import axios from "axios";

const API_URL =
  import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});
api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      console.log("Token expired or unauthorized");

      // 🔥 CLEAR TOKEN
      localStorage.removeItem("token");

      // 🔥 REDIRECT TO LOGIN PAGE
      window.location.href = "/admin/login";

      // OR (if modal use karna hai)
      // window.dispatchEvent(new Event("auth-error"));
    }

    return Promise.reject(err);
  }
);


export default api;