import axios, { type AxiosRequestConfig } from "axios";
import type { Car } from "../type"

const BASE_URL = import.meta.env.VITE_API_URL;

const getAxiosConfig = (): AxiosRequestConfig => {
    const token = sessionStorage.getItem('jwt');
    return {
        headers: {
            'Authorization': token
        }
    }
}

//자동차 목록 조회
export const getCars = async (): Promise<Car[]> => {
    const response = await axios.get(`${BASE_URL}/cars`, getAxiosConfig());
    return response.data;
}

export const deleteCar = async (id: number): Promise<number> => {
    const response = await axios.delete(`${BASE_URL}/cars/${id}`, getAxiosConfig());
    return response.data;
}

export const addCar = async (car: Car): Promise<Car> => {
    const response = await axios.post(`${BASE_URL}/cars`, car, getAxiosConfig());
    return response.data;
}

export const updateCar = async (car: Car): Promise<Car> => {
    const response = await axios.put(`${BASE_URL}/cars`, car, getAxiosConfig());
    return response.data;
}