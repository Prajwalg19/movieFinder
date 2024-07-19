import express from "express";
import wishLists from "../models/wishLists";
import axios from "../utils/axios"
import customError from "../utils/customError";


type controllerType = (req: express.Request, res: express.Response, next: express.NextFunction) => void;
type paramTypes = {searchTerm: string | null, page: number, plot: "short" | "long", year: string | null, type: "movie" | "series" | "episode"};


export const searchMovie: controllerType = async (req, res, next) => {
    try {
        const {searchTerm, page, plot, year, type} = req.query;
        if (searchTerm == "" || searchTerm == null || !searchTerm) {
            return next(customError("Enter a movie title", 400));
        }
        const response = await axios.get(`&s=${searchTerm}`);
        res.json(response.data);
    } catch (e) {
        next(e);
    }


}


export const getMovie: controllerType = async (req, res, next) => {
    try {
    }
    catch (e) {
        next(e);
    }
}


export const addtowish: controllerType = async (req, res, next) => {
    try {
        new wishLists()

    }
    catch (e) {

    }
}

