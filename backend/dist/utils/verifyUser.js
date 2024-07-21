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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = verifyToken;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const customError_1 = __importDefault(require("./customError"));
dotenv_1.default.config();
function verifyToken(req, _, next) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        try {
            if (!((_a = req.cookies) === null || _a === void 0 ? void 0 : _a.my_cookie)) {
                return next((0, customError_1.default)("No cookie!!", 401));
            }
            const token = req.cookies.my_cookie;
            if (!token) {
                return next((0, customError_1.default)("Unauthorized", 401));
            }
            jsonwebtoken_1.default.verify(token, process.env.JWT_SEC_KEY, (err, decrypted) => {
                if (err) {
                    return next((0, customError_1.default)("Forbidden: Access token expired", 403));
                }
                req.userIdFromCookie = decrypted;
                next();
            });
        }
        catch (e) {
            next(e);
        }
    });
}
