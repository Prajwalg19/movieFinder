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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Oauth = exports.deleteUser = exports.login = exports.register = void 0;
const userModel_1 = __importDefault(require("../models/userModel"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const customError_1 = __importDefault(require("../utils/customError"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
dotenv_1.default.config();
function isMongoServerError(e) {
    return e && e.code == 11000;
}
const register = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { userName, password, email } = req.body;
    try {
        if (!userName || !email || !password || userName == "" || email == "" || password == "") {
            return next((0, customError_1.default)("All fields are required", 400));
        }
        const hashedPass = bcrypt_1.default.hashSync(password, 10);
        const query = new userModel_1.default({
            userName,
            password: hashedPass,
            email: email.toLowerCase()
        });
        yield query.save();
        res.status(201).json({ message: "User created successfully" });
    }
    catch (e) {
        if (isMongoServerError(e)) {
            next((0, customError_1.default)("Account already exists", 409));
        }
        else {
            next(e);
        }
    }
});
exports.register = register;
const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        if (!email || !password || email == "" || password == "") {
            return next((0, customError_1.default)("All fields are required", 400));
        }
        const query = yield userModel_1.default.findOne({ email: email.toLowerCase() });
        if (query) {
            if (query.password) {
                const isPassword = bcrypt_1.default.compareSync(password, query.password);
                if (isPassword) {
                    const token = jsonwebtoken_1.default.sign({ id: query._id }, process.env.JWT_SEC_KEY, { expiresIn: "2d" });
                    const _a = query._doc, { password } = _a, rest = __rest(_a, ["password"]);
                    res.cookie("my_cookie", token, {
                        httpOnly: true, sameSite: "none", secure: true, partitioned: true,
                        maxAge: 7 * 24 * 60 * 60 * 1000
                    }).status(200).json(rest);
                }
                else {
                    res.status(401).json({ message: "Email or Password is incorrect" });
                }
            }
        }
        else {
            return next((0, customError_1.default)("User doesn't exist", 404));
        }
    }
    catch (e) {
        next(e);
    }
});
exports.login = login;
const deleteUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield userModel_1.default.findByIdAndDelete(req.params.id);
        if (!response) {
            return next((0, customError_1.default)("User doesn't exists", 404));
        }
        yield wishLists_1.default.findOneAndDelete({ user: new mongoose_1.default.Types.ObjectId(req.params.id) });
        res.status(200).json({ message: "deleted user successfully" });
    }
    catch (e) {
        next(e);
    }
});
exports.deleteUser = deleteUser;
const wishLists_1 = __importDefault(require("../models/wishLists"));
const Oauth = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { displayName, photoURL, email } = req.body;
        if (!email || !displayName || !photoURL || email == "" || displayName == "" || photoURL == "") {
            return next((0, customError_1.default)("All fields are required", 400));
        }
        const query = yield userModel_1.default.findOne({ email });
        if (!query) {
            const password = Math.floor(Math.random() * 10000).toString();
            const hashedPass = bcrypt_1.default.hashSync(password, 10);
            const userName = displayName.trim().split(" ").join("").toLowerCase() + "_" + Math.floor(Math.random() * 10000).toString();
            const response = new userModel_1.default({
                userName,
                password: hashedPass,
                userPfp: photoURL,
                email
            });
            const userDoc = yield response.save();
            const _a = userDoc.toObject(), { password: pass } = _a, rest = __rest(_a, ["password"]);
            const token = jsonwebtoken_1.default.sign({ id: userDoc._id }, process.env.JWT_SEC_KEY, { expiresIn: "2d" });
            res.cookie("my_cookie", token, { httpOnly: true, sameSite: 'none', secure: true, partitioned: true }).status(201).json(rest);
        }
        else {
            const _b = query.toObject(), { password } = _b, rest = __rest(_b, ["password"]);
            const token = jsonwebtoken_1.default.sign({ id: query._id }, process.env.JWT_SEC_KEY, { expiresIn: "2d" });
            res.cookie("my_cookie", token, { httpOnly: true, sameSite: 'none', secure: true, partitioned: true }).status(200).json(rest);
        }
    }
    catch (e) {
        next(e);
    }
});
exports.Oauth = Oauth;
