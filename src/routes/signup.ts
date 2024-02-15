import express, { Request, Response } from "express";
import { body } from "express-validator";
import { BadRequestError, validateRequest } from "@ticket101/common";
import { User } from "../models/user";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post("/api/users/signup", [
    body("email").isEmail().withMessage("Username must be an email"),
    body("password").trim().notEmpty().withMessage("Password cannot be empty")
],
    validateRequest,
    async (req: Request, res: Response) => {
        const {email, password} = req.body;

        const exitsingUser = await User.findOne({email})

        if (exitsingUser) {
            throw new BadRequestError("Email in use")
        }

        const user = User.build({email, password});

        await user.save();
        // Generate JWT
        const userJwt = jwt.sign({
            user_id: user.id,
            email: user.email
        },
        process.env.JWT_TOKEN!
        )

        res.status(201).send(user)
});

export { router as signupRouter }