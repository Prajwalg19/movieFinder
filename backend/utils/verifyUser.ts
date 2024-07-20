import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import customError from "./customError.js"
import express from "express"
dotenv.config()

export default async function verifyToken(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
        if (!req.cookies?.my_cookie) {
            return next(customError("No cookie!!", 401))
        }
        const token = req.cookies.my_cookie // this only works because i am using the cookie-parser library which populates the cookies with an object of all the cookies and thier values
        if (!token) {
            return next(customError("Unauthorized", 401))
        }
        jwt.verify(token, process.env.JWT_SEC_KEY!, (err, decrypted) => {
            if (err) {
                return next(customError("Forbidden: Access token expired", 403))
            }
            req.userIdFromCookie = decrypted
        })
        next()

    } catch (e) {
        next(e)
    }

}
