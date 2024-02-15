import express, { Request, Response } from "express";

const router = express.Router();

router.post("/api/users/signout", (req: Request, res: Response) => {
    res.send("Logout successfully!");
});

export { router as signoutRouter }