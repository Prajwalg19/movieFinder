"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authController_1 = require("../controllers/authController");
const route = express_1.default.Router();
route.post("/register", authController_1.register);
route.post("/login", authController_1.login);
route.post("/oauth", authController_1.Oauth);
route.delete("/delete/:id", authController_1.deleteUser);
exports.default = route;
