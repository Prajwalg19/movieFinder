import {AxiosError} from "axios";
import {AUTH_ENDPOINTS} from "../apis";
import axios from "../axios";

export async function handleRegister(value: {email: string, password: string, userName: string}) {
    try {
        const response = await axios.post(AUTH_ENDPOINTS.REGISTER, {
            email: value.email.trim().toLowerCase(),
            password: value.password,
            userName: value.userName
        })
        if (!response.status) {
            throw new Error("Unexpected response format");
        }
        return response.status;
    } catch (e: unknown) {
        if (e instanceof AxiosError) {
            if (e.response?.status == 400) {
                throw new Error("All fields are required");
            } else if (e.response?.status == 409) { // status code for conflicting data in the database indicating user already exists in the database
                throw new Error(e.response.data.message)
            }
        } else {
            throw new Error("Something went wrong")
        }
    }


}

