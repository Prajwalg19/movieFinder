import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import customError from "./customError";
import {Request, Response, NextFunction} from "express";

dotenv.config();

interface CustomRequest extends Request {
    userIdFromCookie?: string | jwt.JwtPayload;
}

export default async function verifyToken(
    req: CustomRequest,
    _: Response,
    next: NextFunction
) {
    try {
        if (!req.cookies?.my_cookie) {
            return next(customError("No cookie!!", 401));
        }

        const token = req.cookies.my_cookie;
        if (!token) {
            return next(customError("Unauthorized", 401));
        }

        jwt.verify(token, process.env.JWT_SEC_KEY!, (err: any, decrypted: any) => {
            if (err) {
                return next(customError("Forbidden: Access token expired", 403));
            }
            req.userIdFromCookie = decrypted!;
            next();
        });

    } catch (e) {
        next(e);
    }
}
