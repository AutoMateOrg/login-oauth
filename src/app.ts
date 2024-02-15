import express from "express";
import { signinRouter } from "./routes/signin";
import { signoutRouter } from "./routes/signout";
import { signupRouter } from "./routes/signup";
import { json } from "body-parser";
import { errorHandler } from "./middlewares/error-handler";
import cors from "cors";

const port = 3100;
const app = express();

app.use(json());
app.use(cors());
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);


app.use(errorHandler);

export { app }