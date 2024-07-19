import express from "express";
import {login, register, Oauth} from "../controllers/authController";
const route = express.Router();

route.post("/register", register);
route.post("/login", login)
route.post("/oauth", Oauth)

export default route;

