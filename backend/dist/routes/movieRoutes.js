"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const movieController_1 = require("../controllers/movieController");
const route = express_1.default.Router();
route.get("/search", movieController_1.searchMovie);
route.post("/updatewishlist", movieController_1.updateWishList);
route.get("/:imdbID", movieController_1.getMovie);
route.get("/fetchwishlist/:userId", movieController_1.fetchUserWishLists);
//http://www.omdbapi.com?apikey=${import.meta.env.VITE_OMDB_API_KEY}
exports.default = route;
