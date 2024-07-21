"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchUserWishLists = exports.updateWishList = exports.getMovie = exports.searchMovie = void 0;
const wishLists_1 = __importDefault(require("../models/wishLists"));
const axios_1 = __importDefault(require("../utils/axios"));
const customError_1 = __importDefault(require("../utils/customError"));
const mongoose_1 = __importDefault(require("mongoose"));
const searchMovie = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { searchTerm, page, plot, year, type } = req.query;
        if (searchTerm == "" || searchTerm == null || !searchTerm) {
            return next((0, customError_1.default)("Enter a movie title", 400));
        }
        const response = yield axios_1.default.get(`&s=${searchTerm}&page=${page}&plot=${plot}&y=${year}&type=${type}`);
        res.json(response.data);
    }
    catch (e) {
        next(e);
    }
});
exports.searchMovie = searchMovie;
const getMovie = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { imdbID } = req.params;
        console.log(req.params);
        const response = yield axios_1.default.get(`&i=${imdbID}&plot=full`);
        res.json(response.data);
    }
    catch (e) {
        next(e);
    }
});
exports.getMovie = getMovie;
const updateWishList = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId, movieData } = req.body;
        const query = yield wishLists_1.default.findOne({ user: userId });
        if (!query) {
            yield wishLists_1.default.create({
                user: new mongoose_1.default.Types.ObjectId(userId),
                moviesData: [movieData]
            });
            res.status(200).json({ message: "Movie added to wishlist" });
        }
        else {
            const movieIndex = query.moviesData.findIndex(movie => movie.imdbID === movieData.imdbID);
            if (movieIndex !== -1) {
                query.moviesData.splice(movieIndex, 1);
                yield query.save();
                res.status(200).json({ message: "Movie removed from wishlist" });
            }
            else {
                query.moviesData.push(movieData);
                yield query.save();
                res.status(200).json({ message: "Movie added to wishlist" });
            }
        }
    }
    catch (e) {
        next(e);
    }
});
exports.updateWishList = updateWishList;
const fetchUserWishLists = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const query = yield wishLists_1.default.findOne({ user: userId });
        if (!query) {
            return res.status(200).json([]);
        }
        else {
            const response = yield wishLists_1.default.aggregate([
                {
                    $match: {
                        user: new mongoose_1.default.Types.ObjectId(userId)
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
    }
    catch (e) {
        next(e);
    }
});
exports.fetchUserWishLists = fetchUserWishLists;
