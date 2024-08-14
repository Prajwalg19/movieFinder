import axios from "../axios";
import {AUTH_ENDPOINTS} from "../apis";
import {AxiosError} from "axios";

export async function handleOAuth({displayName, email, photoURL}: {displayName: string; email: string; photoURL: string | null}) {
    try {
        const response = await axios.post(AUTH_ENDPOINTS.OAUTH_LOGIN, {displayName, email, photoURL});

        if (!response.data) {
            throw new Error("Unexpected response format.");
        }

        return response.data;
    } catch (e: unknown) {
        if (e instanceof AxiosError && e.response) {
            throw new Error(e.response.data.message);
        } else {
            throw e;
        }
    }
}


export async function handleLogin(value: {email: string, password: string}) {
    try {
        const response = await axios.post(AUTH_ENDPOINTS.LOGIN, {
            password: value.password,
            email: value.email.trim().toLowerCase()
        })
        if (!response.data || typeof response.data !== 'object') {
            throw new Error("Unexpected server response.");
        }
        return response.data;
    } catch (e: unknown) {
        if (e instanceof AxiosError) {
            const statusCode = e.response?.status;
            const message = e.response?.data.message || "An error occurred"
            switch (Number(statusCode)) {
                case 400: throw new Error("All fields are required");
                case 401:
                case 403:
                case 404: throw new Error(message);
                default: throw new Error("Something went wrong");
            }
        } else {
            throw e;
        }
    }
}

