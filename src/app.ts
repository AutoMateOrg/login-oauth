import express from "express";
import { signinRouter } from "./routes/signin";
import { signoutRouter } from "./routes/signout";
import { signupRouter } from "./routes/signup";
import { json } from "body-parser";
import { errorHandler } from "@ticket101/common";
import cors from "cors";
import cookieSession from "cookie-session";
import { NotFoundError } from "@ticket101/common";
import { currentUserRouter } from "./routes/current-user";
import "express-async-errors";

const app = express();

app.set("trust proxy", true);
app.use(json());
app.use(cookieSession({
    secure: false,
    signed: false
}))

app.use(cors());

app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);

app.all("*", ()=> {
    throw new NotFoundError();
})

app.use(errorHandler);

export { app }