import axios, { AxiosInstance } from "axios";
import * as SecureStore from "expo-secure-store";
import { authEventEmitter } from "~/context/auth-context";

const api: AxiosInstance = axios.create({
  baseURL: "http://10.0.2.2:8000/api",
  headers: {
    accept: "*/*",
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(async (request) => {
  const token = SecureStore.getItem("token");
  if (token) {
    request.headers.Authorization = `Bearer ${token}`;
  }
  return request;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (
      error.response &&
      error.response.data &&
      error.response.data.error === true &&
      error.response.data.message === "Token Expirado"
    ) {
      await SecureStore.deleteItemAsync("token");
      authEventEmitter.emit("logout");
    }

    return Promise.reject(error);
  }
);

export default api;
