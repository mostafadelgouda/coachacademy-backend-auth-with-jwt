import express from "express"; //es6
import morgan from "morgan"; //es6
import userRouter from "./routes/userRouter.js";
import dotenv from "dotenv";
import { MongoClient } from "mongodb";
import connectToDatabase from "./config/db.js";
import postRouter from "./routes/postRouter.js";
import { errorHandlingMiddleware } from "./middleware/errorHandling.js";
connectToDatabase();
dotenv.config();
const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use("/api/v1/users", userRouter);
app.use("/api/v1/posts", postRouter);
app.use(errorHandlingMiddleware);

app.listen(3000);
