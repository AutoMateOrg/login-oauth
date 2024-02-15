import { app } from "./app";
import mongoose from "mongoose";

const port = 12374;

const start = async () => {
    try {
        await mongoose.connect(`mongodb://${process.env.USERNAME}:${process.env.PASSWORD}@${process.env.DB_URI}/auth`)
        app.listen(port, () => {
            console.log(`Server is listening on port ${port}`);
        })
    } catch(err) {
        console.log(err);
    }

}