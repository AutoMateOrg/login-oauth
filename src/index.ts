import { app } from "./app";
import mongoose from "mongoose";

const port = 14374;

const start = async () => {
    try {
        await mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/auth`)
        console.log("Connected to MongoDB");
    } catch(err) {
        console.log(err);
    }
    app.listen(port, () => {
        console.log(`Server is listening on port ${port}`);
    })
}

start();