import axios from "axios";
import { API_TOKEN_REFRESH_URL } from "../consts/api";

const api = axios.create();

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("access");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const original = error.config;

    if (error.response?.status === 401 && !original._retry) {
      original._retry = true;

      const refresh = localStorage.getItem("refresh");
      if (!refresh) return Promise.reject(error);

      try {
        const res = await axios.post(API_TOKEN_REFRESH_URL, { refresh });
        localStorage.setItem("access", res.data.access);

        original.headers.Authorization = `Bearer ${res.data.access}`;
        return api(original);
      } catch (e) {
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
      }
    }

    return Promise.reject(error);
  }
);

export default api;
