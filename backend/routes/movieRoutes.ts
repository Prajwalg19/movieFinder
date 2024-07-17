import express from "express";
import {login, register} from "../controllers/authController";
const route = express.Router();

route.get("/getmovie", register);
route.post("/addtowish", login)
//http://www.omdbapi.com?apikey=${import.meta.env.VITE_OMDB_API_KEY}

export default route;


