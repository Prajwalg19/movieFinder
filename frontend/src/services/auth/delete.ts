import axios from "../axios";
import {AUTH_ENDPOINTS} from "../apis";
import {AxiosError} from "axios";

export async function handleDeleteUser(id: string) {
    try {
        const response = await axios.delete(`${AUTH_ENDPOINTS.DELETE_USER}/${id}`)
        if (response.status == 200) {
            return response.data.message;
        } else {
            throw new Error("Unexpected response format.")
        }
    } catch (e: unknown) {
        if (e instanceof AxiosError && e.response?.status == 404) {
            throw new Error(e.response.data);
        } else {
            throw new Error("Unexpected error occured");
        }
    }
}

