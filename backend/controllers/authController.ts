import userModel from "../models/userModel";
import bcryptjs from "bcrypt"
import customError from "../utils/customError";
import jwt from "jsonwebtoken";
import dotenv from "dotenv"
import express from "express"
import mongoose, {FilterQuery} from "mongoose";
dotenv.config();

type controllerType = (req: express.Request, res: express.Response, next: express.NextFunction) => void

function isMongoServerError(e: any) {
    return e && e.code == 11000;
}

export const register: controllerType = async (req, res, next) => {
    const {userName, password, email}: {userName: string, password: string, email: string} = req.body;
    try {

        if (!userName || !email || !password || userName == "" || email == "" || password == "") {
            return next(customError("All fields are required", 400));
        }
        const hashedPass = bcryptjs.hashSync(password, 10);
        const query = new userModel({
            userName,
            password: hashedPass,
            email: email.toLowerCase()
        })
        await query.save();
        res.status(201).json({message: "User created successfully"});
    } catch (e) {
        if (isMongoServerError(e)) {
            next(customError("Account already exists", 409))
        }
        else {
            next(e)
        }
    }
}


export const login: controllerType = async (req, res, next) => {
    const {email, password}: {email: string, password: string} = req.body;

    try {
        if (!email || !password || email == "" || password == "") {
            return next(customError("All fields are required", 400));
        }
        const query: FilterQuery<typeof userModel> | null = await userModel.findOne({email: email.toLowerCase()})
        if (query) {
            if (query.password) {
                const isPassword = bcryptjs.compareSync(password, query.password);
                if (isPassword) {
                    const token = jwt.sign({id: query._id}, process.env.JWT_SEC_KEY!, {expiresIn: "2d"})
                    const {password, ...rest} = query._doc
                    res.cookie("my_cookie", token, {
                        httpOnly: true, sameSite: "none", secure: true, partitioned: true,
                        maxAge: 7 * 24 * 60 * 60 * 1000
                    }).status(200).json(rest)

                } else {
                    res.status(401).json({message: "Email or Password is incorrect"})
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
            return next(customError("User doesn't exists", 404));
        }
        await wishLists.findOneAndDelete({user: new mongoose.Types.ObjectId(req.params.id)});
        res.status(200).json({message: "deleted user successfully"})
    } catch (e) {
        next(e)
    }
}



import {Document} from 'mongoose';
import wishLists from "../models/wishLists";

export interface IUser {
    userName: string;
    password: string;
    userPfp: string;
    email: string;
}

export interface IUserDocument extends IUser, Document {}

export const Oauth: controllerType = async (req, res, next) => {

    try {
        const {displayName, photoURL, email} = req.body;
        if (!email || !displayName || !photoURL || email == "" || displayName == "" || photoURL == "") {
            return next(customError("All fields are required", 400));
        }
        const query = await userModel.findOne({email})
        if (!query) {
            const password = Math.floor(Math.random() * 10000).toString();
            const hashedPass = bcryptjs.hashSync(password, 10);

            const userName = displayName.trim().split(" ").join("").toLowerCase() + "_" + Math.floor(Math.random() * 10000).toString()


            const response = new userModel({
                userName,
                password: hashedPass,
                userPfp: photoURL,
                email
            })
            const userDoc: IUserDocument = await response.save();
            const {password: pass, ...rest} = userDoc.toObject();
            const token = jwt.sign({id: userDoc._id}, process.env.JWT_SEC_KEY!, {expiresIn: "2d"})
            res.cookie("my_cookie", token, {httpOnly: true, sameSite: 'none', secure: true, partitioned: true}).status(201).json(rest);
        }
        else {
            const {password, ...rest} = query.toObject();
            const token = jwt.sign({id: query._id}, process.env.JWT_SEC_KEY!, {expiresIn: "2d"});
            res.cookie("my_cookie", token, {httpOnly: true, sameSite: 'none', secure: true, partitioned: true}).status(200).json(rest);
        }

    } catch (e) {
        next(e)

    }
}
