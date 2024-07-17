import axios from "axios";
import omdbapi from "@/constants/omdbapi";

const axiosInstance = axios.create({
    withCredentials: true,
    baseURL: "http://localhost:4000",
})

export default axiosInstance;
