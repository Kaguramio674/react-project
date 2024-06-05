import { LoginResponse, UserType } from "@/type/user";
import request from "@/utils/request";
import qs from "qs";
import axios, { AxiosError } from 'axios';

export async function login(params: Pick<UserType, "username" | "password">): Promise<LoginResponse> {
    try {
      const response = await axios.post<LoginResponse>("api/users/login", params);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<LoginResponse>;
        if (axiosError.response) {
          console.log("Response from login:", axiosError.response.data);
          return axiosError.response.data;
        }
      }
      console.log("Error", error);
      return { success: false, message: "Error logging in" };
    }
  }
  
export async function register(params: Pick<UserType, "username" | "email" | "password"|"identity">) {
    return request.post("api/users", params);
  }