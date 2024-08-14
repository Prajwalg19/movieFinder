import {AxiosError} from "axios";
import {AUTH_ENDPOINTS} from "../apis";
import axios from "../axios";

export async function handleRegister(value: {email: string; password: string; userName: string;}) {
    try {
        const response = await axios.post(AUTH_ENDPOINTS.REGISTER, {
            email: value.email.trim().toLowerCase(),
            password: value.password,
            userName: value.userName
        });

        if (response.status !== 201) {
            throw new Error(`Unexpected response status: ${response.status}`);
        }
        return response.status;
    } catch (e: unknown) {
        if (e instanceof AxiosError) {
            if (e.response?.status === 400) {
                throw new Error("All fields are required. Please check your input.");
            } else if (e.response?.status === 409) { // status code for conflicting data in the database indicating user already exists in the database
                throw new Error(e.response.data.message || "User already exists. Please use a different email.");
            } else if (e.response?.status === 500) {
                throw new Error("Server error. Please try again later.");
            } else {
                throw new Error(`Unexpected error: ${e.response?.status} - ${e.response?.statusText}`);
            }
        } else {
            throw e;
        }
    }
}
