import axios from "axios";
import {BASE_ENDPOINT} from "./apis";

const axiosInstance = axios.create({
    withCredentials: true,
    baseURL: BASE_ENDPOINT,
})

export default axiosInstance;
