import express, { Request, Response } from "express";
import { body } from "express-validator";
import { BadRequestError, validateRequest } from "@ticket101/common";
import { User } from "../models/user";
import { Password } from "../services/password";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post("/api/users/signin", [
    body("email").isEmail().withMessage("Username must be an email"),
    body("password").trim().notEmpty().withMessage("Password cannot be empty")
], 
validateRequest,
async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const exitsingUser = await User.findOne({ email });

    if (!exitsingUser) {
        throw new BadRequestError("Invalid credentials")
    }

    const passwordMatch = await Password.compare(exitsingUser.password, password);

    if (!passwordMatch) {
        throw new BadRequestError("Invalid credentials")
    }
    // Generate JWT
    const userJwt = jwt.sign({
        user_id: exitsingUser.id,
        email: exitsingUser.email
    }, process.env.JWT_TOKEN!
    );

    req.session = {
        jwt: userJwt
    }

    res.status(200).send(exitsingUser)
    
})

export { router as signinRouter };