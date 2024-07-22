import express from "express";
import wishLists from "../models/wishLists";
import axios from "../utils/axios"
import customError from "../utils/customError";
import mongoose from "mongoose";


type controllerType = (req: express.Request, res: express.Response, next: express.NextFunction) => void;
type paramTypes = {searchTerm: string | null, page: number, plot: "short" | "long", year: string | null, type: "movie" | "series" | "episode"};


export const searchMovie: controllerType = async (req, res, next) => {
    try {
        const {searchTerm, page, plot, year, type} = req.query;
        if (searchTerm == "" || searchTerm == null || !searchTerm) {
            return next(customError("Enter a movie title", 400));
        }
        const response = await axios.get(`&s=${searchTerm}&page=${page}&plot=${plot}&y=${year}&type=${type}`);
        res.status(200).json(response.data);
    } catch (e) {
        next(e);
    }


}


export const getMovie: controllerType = async (req, res, next) => {
    try {
        const {imdbID} = req.params;
        const response = await axios.get(`&i=${imdbID}&plot=full`)
        res.json(response.data);
    }
    catch (e) {
        next(e);
    }
}


export const updateWishList: controllerType = async (req, res, next) => {
    try {
        const {userId, movieData} = req.body;
        const query = await wishLists.findOne({user: userId});

        if (!query) {
            await wishLists.create({
                user: new mongoose.Types.ObjectId(userId),
                moviesData: [movieData]
            });
            res.status(200).json({message: "Movie added to wishlist"});
        } else {
            const movieIndex = query.moviesData.findIndex(movie => movie.imdbID === movieData.imdbID);
            if (movieIndex !== -1) {
                query.moviesData.splice(movieIndex, 1);
                await query.save();
                res.status(200).json({message: "Movie removed from wishlist"});
            } else {
                query.moviesData.push(movieData);
                await query.save();
                res.status(200).json({message: "Movie added to wishlist"});
            }
        }
    } catch (e) {
        next(e);
    }
};



export const fetchUserWishLists: controllerType = async (req, res, next) => {
    try {
        const {userId} = req.params;
        const query = await wishLists.findOne({user: userId});
        if (!query) {
            return res.status(200).json([]);
        } else {
            const response = await wishLists.aggregate([
                {
                    $match: {
                        user: new mongoose.Types.ObjectId(userId)
                    }
                },
                {
                    $project: {
                        moviesData: 1,
                        _id: 0
                    }
                },
                {
                    $unwind: "$moviesData"
                },
                {
                    $replaceRoot: {
                        newRoot: "$moviesData"
                    }
                }
            ]);
            res.status(200).json(response);
        }
    } catch (e) {
        next(e);
    }
}
