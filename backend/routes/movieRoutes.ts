import express from "express";
import {addtowish, getMovie} from "../controllers/movieController";
const route = express.Router();

route.get("/getmovie", getMovie);
route.post("/addtowish", addtowish)
//http://www.omdbapi.com?apikey=${import.meta.env.VITE_OMDB_API_KEY}

export default route;


