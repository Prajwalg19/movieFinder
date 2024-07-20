import express from "express";
import {updateWishList, getMovie, searchMovie, fetchUserWishLists} from "../controllers/movieController";
const route = express.Router();

route.get("/search", searchMovie);
route.post("/updatewishlist", updateWishList)
route.get("/:imdbID", getMovie)
route.get("/fetchwishlist/:userId", fetchUserWishLists)
//http://www.omdbapi.com?apikey=${import.meta.env.VITE_OMDB_API_KEY}

export default route;


