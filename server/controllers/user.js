import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import User from "../models/user.js"
import {validationResult} from "express-validator";
import dotenv from "dotenv";

dotenv.config()

export const login = async (req, res) => {
    try {
        const errors = validationResult(req)

        if(!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array().map((error) => error.msg), message: "Incorrect data for login"})
        }

        const {email, password} = req.body
        const existingUser = await User.findOne({email})

        if (!existingUser) {
            return res.status(404).json({message: "Wrong email or password"})
        }

        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password)

        if (!isPasswordCorrect) {
            return res.status(404).json({message: "Wrong email or password"})
        }

        const token = jwt.sign({
            email: existingUser.email,
            id: existingUser._id
        }, process.env.JWT_SECRET_KEY, {expiresIn: "1h"})

        const existingUserJSON = existingUser.toObject()
        delete existingUserJSON.password

        res.status(200).json({token, userInfo: existingUserJSON})
    } catch (e) {
        res.status(500).json({message: "Something went wrong, try again"})
    }
}

export const register = async (req, res) => {
    try {
        const errors = validationResult(req)

        if(!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array().map((error) => error.msg), message: "Incorrect data for register"})
        }

        const {email, password, confirmPassword, firstName, lastName} = req.body
        const candidate = await User.findOne({email})

        if (candidate) {
            return res.status(404).json({message: "Such a user already register"})
        }

        if (password !== confirmPassword) {
            return res.status(400).json({message: "Passwords don`t match"})
        }

        const hashedPassword = await bcrypt.hash(password, 12)

        const userInfo = await User.create({ email, password: hashedPassword, name: `${firstName} ${lastName}`, })

        const token = jwt.sign({
            email: userInfo.email,
            id: userInfo._id
        }, process.env.JWT_SECRET_KEY, {expiresIn: "1h"})

        const userInfoJSON = userInfo.toObject()
        delete userInfoJSON.password

        res.status(200).json({token, userInfo: userInfoJSON})
    } catch (e) {
        res.status(500).json({message: "Something went wrong, try again"})
    }
}
