import axios from "axios";
import Cookies from "js-cookie";

export const apiClient = axios.create({
	baseURL: import.meta.env.VITE_BACKEND_API, // Base URL for your API
	headers: {
		"Content-Type": "application/json",
	},
});

apiClient.interceptors.request.use((config) => {
	return config;
});

const token = Cookies.get("mjs.token");

if (token) {
	apiClient.defaults.headers["Authorization"] = `Bearer ${token}`;
}
