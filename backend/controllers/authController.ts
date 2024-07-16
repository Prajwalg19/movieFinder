import userModel from "../models/userModel";
import bcryptjs from "bcrypt"
import customError from "../utils/customError";
import jwt from "jsonwebtoken";
import dotenv from "dotenv"
import express from "express"
import {FilterQuery} from "mongoose";
dotenv.config();

type controllerType = (req: express.Request, res: express.Response, next: express.NextFunction) => void

export const register: controllerType = async (req, res, next) => {
    const {userName, password, email} = req.body;
    function isMongoServerError(e: any) {
        return e && e.code == 11000;
    }
    try {

        if (!userName || !email || !password || userName == "" || email == "" || password == "") {
            return next(customError("All fields are required", 400));// 400 bad Request
        }
        const hashedPass = bcryptjs.hashSync(password, 10);
        const query = new userModel({
            userName,
            password: hashedPass,
            email
        })
        await query.save();
        res.status(201).json("user created successfully");
    } catch (e) {
        if (isMongoServerError(e)) {
            next(customError("Email or Username already exists", 409))
        }
        else {
            next(e)
        }
    }
}


export const login: controllerType = async (req, res, next) => {
    const {email, password} = req.body;

    try {
        if (!email || !password || email == "" || password == "") {
            return next(customError("All fields are required", 400));
        }
        const query: FilterQuery<typeof userModel> | null = await userModel.findOne({email: email})
        if (query) {
            if (query.password) {
                const isPassword = bcryptjs.compareSync(password, query.password);
                if (isPassword) {
                    const token = jwt.sign({id: query._id}, process.env.JWT_SEC_KEY!, {expiresIn: "2d"})
                    const {password, ...rest} = query._doc
                    res.cookie("my_cookie", token, {
                        httpOnly: true, sameSite: "none", secure: true, partitioned: true,
                        maxAge: 2 * 24 * 60 * 60 * 1000
                    }).status(200).json(rest)

                } else {
                    res.status(401).json({message: "Password is incorrect"})
                }
            }
        } else {
            return next(customError("User doesn't exist", 404))
        }
    } catch (e) {
        next(e);
    }

}


export const deleteUser: controllerType = async (req, res, next) => {
    try {
        const response = await userModel.findByIdAndDelete(req.params.id)
        if (!response) {
            return next(customError("user doesn't exists", 404));
        }
        res.status(200).json({message: "deleted user successfully"})
    } catch (e) {
        next(e)
    }
}



