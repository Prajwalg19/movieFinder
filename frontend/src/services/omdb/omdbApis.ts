import axios from "../axios";
import {OMDB_ENDPOINTS} from "../apis";
import {AxiosError} from "axios";
import {movieSpecificType} from "@/types/types";
export async function fetchHomePageMovies() {
    try {
        const response = await axios.get(OMDB_ENDPOINTS.HOME_PAGE_OMDB_ENDPOINT)
        if (response && response.data) {
            if (response.data.Response == "True") {
                return response.data.Search;
            } else {
                throw new Error("Content not found")
            }
        }
        else {
            throw new Error(response.data?.Response || "Something went wrong");
        }
    }
    catch (e) {
        if (e instanceof AxiosError && e.request) {
            throw new Error("Unexpected error occured");
        } else {
            throw e;
        }
    }
}


export const handleMovieDetailsFetch = async (id: string) => {
    try {
        const response: {data: movieSpecificType} = await axios.get(`${OMDB_ENDPOINTS.GET_MOVIE_BY_ID}/${id}`);
        if (response?.data?.Response === "True") {
            return response.data;
        } else if (response?.data?.Response == "False") {
            throw new Error("Movie not found")
        } else {
            throw new Error(response.data?.Response || "Let's give it another try");
        }
    } catch (e) {
        if (e instanceof AxiosError && e.response?.status == 404) {
            throw new Error("Page Not found")
        } else {
            throw e;
        }
    }
};

