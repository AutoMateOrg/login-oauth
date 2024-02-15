import express, { Request, Response } from "express";
import { body, validationResult } from "express-validator";

const router = express.Router();

router.post("/api/users/signup", [
    body("username").isEmail().withMessage("Username must be an email"),
    body("password").trim().notEmpty().withMessage("Password cannot be empty")
], (req: Request, res: Response) => {
    const result = validationResult(req);
    const { username, password } = req.body;
    if (result.isEmpty()){
        console.log(username, password);
        res.send("Login successfully!");
    }
    res.send({ errors: result.array() });
});

export { router as signupRouter }