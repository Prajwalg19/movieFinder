import express from "express";
import {addtowish, getMovie, searchMovie} from "../controllers/movieController";
const route = express.Router();

route.get("/search", searchMovie);
route.post("/addtowish", addtowish)
route.get("/:imdbID", getMovie)
//http://www.omdbapi.com?apikey=${import.meta.env.VITE_OMDB_API_KEY}

export default route;


