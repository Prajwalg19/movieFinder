import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const axiosInstance = axios.create({
    withCredentials: true,
    baseURL: `https://www.omdbapi.com/?apikey=${process.env.OMBD_API_KEY}&r=json`,
})

export default axiosInstance;

