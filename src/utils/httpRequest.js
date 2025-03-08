import axios from "axios";

const httpRequest = axios.create({
    baseURL: process.env.API_BASE_URL,
    withCredentials: true,
});

httpRequest.interceptors.request.use((config) => {
    const token = localStorage.getItem("jwt");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default httpRequest;
