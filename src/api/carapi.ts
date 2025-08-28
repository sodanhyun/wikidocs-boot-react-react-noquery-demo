import { Car }  from '../types';
import axios, { AxiosRequestConfig } from 'axios';

const getAxiosConfig = (): AxiosRequestConfig => {
  const token = sessionStorage.getItem("jwt");
  return {
    headers: {
      'Authorization': token,
      'Content-Type': 'application/json',
    },
  };
};

export const getCars = async (): Promise<Car[]> => {
  const response = await axios.get(`${import.meta.env.VITE_API_URL}/cars`, getAxiosConfig());
  return response.data;
}

export const deleteCar = async (carId: number): Promise<number> => {
  const response = await axios.delete(`${import.meta.env.VITE_API_URL}/cars/${carId}`, getAxiosConfig());
  return response.data
}

export const addCar = async (car: Car): Promise<Car> => {
  const response = await axios.post(`${import.meta.env.VITE_API_URL}/cars`, car, getAxiosConfig());
  return response.data;
}

export const updateCar = async (car: Car): Promise<Car> => {
  const response = await axios.put(`${import.meta.env.VITE_API_URL}/cars`, car, getAxiosConfig());
  return response.data;
}