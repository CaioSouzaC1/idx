import axios, { AxiosInstance } from "axios";
import * as SecureStore from "expo-secure-store";

const api: AxiosInstance = axios.create({
  baseURL: "http://10.0.2.2:8000/api",
  headers: {
    accept: "*/*",
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(async (request) => {
  const token = await SecureStore.getItemAsync("token");
  if (token) {
    request.headers.Authorization = `Bearer ${token}`;
  }
  return request;
});

export default api;
