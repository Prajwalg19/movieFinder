import express from "express";
import {login, register, Oauth, deleteUser} from "../controllers/authController";
const route = express.Router();

route.post("/register", register);
route.post("/login", login)
route.post("/oauth", Oauth)
route.delete("/delete/:id", deleteUser)

export default route;

