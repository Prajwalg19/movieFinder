import {movieSearchType} from "@/types/types";
import {OMDB_ENDPOINTS} from "../apis";
import axios from "../axios";
import {AxiosError} from "axios";
export async function handleFetchWislist(id: string) {
    try {
        const response = await axios.get(`${OMDB_ENDPOINTS.GET_MY_WISHLIST}/${id}`);
        if (!response.data) {
            throw new Error("Unexpected response format");
        }
        return response.data;
    } catch (e) {
        if (e instanceof AxiosError && e.response) {
            throw new Error(e.response.data);
        }
        throw e;
    }
}

export async function handleWishListUpdate({movieData, userId}: {movieData: movieSearchType, userId: string}) {
    try {
        await axios.post(OMDB_ENDPOINTS.UPDATE_WISHLIST, {movieData: movieData, userId: userId});
    } catch (e: unknown) {
        throw e;
    }

}
