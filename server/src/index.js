import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { UserRouter } from "./routes/users.js";
import { RecipesRouter } from "./routes/recipies.js";

const pass = "2mDpUN6gvSToJDWS";
const user = "aamritbistaa";
const app = express();

app.use(express.json());
//converts data from frontend to json

app.use(cors());

app.use("/auth", UserRouter);
app.use("/recipes", RecipesRouter);

mongoose.connect(
  `mongodb+srv://aamritbistaa:${pass}@cluster0.13scpq7.mongodb.net/?retryWrites=true&w=majority`
);

app.listen(8000, () => console.log("Server Started! "));
