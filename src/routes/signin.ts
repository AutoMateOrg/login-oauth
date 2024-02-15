import express, { Request, Response } from "express";
import { body } from "express-validator";
import { validateRequest } from "../middlewares/validate-request";

const router = express.Router();

router.post("/api/users/signin", [
    body("email").isEmail().withMessage("Username must be an email"),
    body("password").trim().notEmpty().withMessage("Password cannot be empty")
], 
validateRequest,
(req: Request, res: Response) => {
    const { email, password } = req.body;
    console.log(email, password);
    res.status(201).send({})
})

export { router as signinRouter };