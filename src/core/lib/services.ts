import axios, { AxiosError, AxiosResponse } from "axios";
export const BASE_URL = 'http://localhost:3000/api'

export const httpService = axios.create({
  baseURL:BASE_URL,
  headers:{
    Accept: 'application/json',
    'Content-Type': 'application/json',
  }
})


export const authService = axios.create({
  baseURL:BASE_URL,
  headers:{
    Accept: 'application/json',
    'Content-Type': 'application/json',
  }
})


authService.interceptors.response.use(
  (response:AxiosResponse<TResponse<unknown>>) => response,
  (error: AxiosError<TResponse<unknown>>) => {
    error.message = error.response?.data.error.message || "Error Occur, Please Try Again"
    return Promise.reject(error);
  }
)