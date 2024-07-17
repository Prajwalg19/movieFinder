import express from "express";
import {login, register} from "../controllers/authController";
const route = express.Router();

route.get("/getmovie", register);
route.post("/addtowish", login)

export default route;


