import axios from "axios"
import { User } from "../types"

export const getAuthToken = async (user: User) => {
    const response = await axios.post(import.meta.env.VITE_API_URL + "/login", user, {
        headers: { 'Content-Type': 'application/json' }
    })
    return response.headers.authorization;
}