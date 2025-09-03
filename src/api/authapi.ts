import axios from "axios"
import type { User } from "../type";

export const getAuthToken = async (user: User) => {
    const response = await axios.post(import.meta.env.VITE_API_URL + "/login", user, {
        headers: { 'Content-Type': 'application/json' }
    })
    return response.headers.authorization;
}