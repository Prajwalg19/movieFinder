// const base_endpoint = "https://movie-finder-eight-silk.vercel.app";
export const BASE_ENDPOINT = "http://localhost:4000";

export const OMDB_ENDPOINTS = {
    HOME_PAGE_OMDB_ENDPOINT: "/movie/search?searchTerm=action&type=movie&year=2020",
    GET_MOVIE_BY_ID: "/movie",
    GET_MY_WISHLIST: "/movie/fetchwishlist",
    UPDATE_WISHLIST: "/movie/updatewishlist"
}

export const AUTH_ENDPOINTS = {
    OAUTH_LOGIN: "/auth/oauth",
    LOGIN: "/auth/login",
    REGISTER: "/auth/register",
    DELETE_USER: "/auth/delete"
}
