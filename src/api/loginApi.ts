import axios from "axios";
import type { User } from "../type";

const BASE_URL = import.meta.env.VITE_API_URL;

export const getAuthToken = async (user: User) => {
    const response = await axios.post(`${BASE_URL}/login`, user);
    return response.headers.authorization;
}