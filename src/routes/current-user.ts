import express, { Request, Response } from "express";
import { currentUser } from "@ticket101/common";

const router = express.Router();

router.post("/api/users/currentuser", currentUser, (req: Request, res: Response) => {
    res.send({currentUser: req.currentUser || null})
})

export { router as currentUserRouter }