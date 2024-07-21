"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const axiosInstance = axios_1.default.create({
    withCredentials: true,
    baseURL: `https://www.omdbapi.com/?apikey=${process.env.OMDB_API_KEY}&r=json`,
});
exports.default = axiosInstance;
