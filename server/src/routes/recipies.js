import express from "express";
import { RecipeModel } from "../models/Recipes.js";
import mongoose from "mongoose";
import { UserModel } from "../models/Users.js";
import { verifyToken } from "./users.js";

const router = express.Router();
//get all recipies
router.get("/", async (req, res) => {
  try {
    const data = await RecipeModel.find({});
    res.send(data);
  } catch (err) {
    res.json(err);
  }
});
//to add recipies
router.post("/", verifyToken, async (req, res) => {
  try {
    const recipe = new RecipeModel(req.body);
    const data = await recipe.save();
    res.send(data);
  } catch (err) {
    res.json(err);
  }
});
//to add recipie to fav list
router.put("/", verifyToken, async (req, res) => {
  try {
    const recipe = await RecipeModel.findById(req.body.recipeID);
    const user = await UserModel.findById(req.body.userID);
    user.savedRecipies.push(recipe);
    await user.save();
    res.json({ savedRecipies: user.savedRecipies });
  } catch (err) {
    res.json(err);
  }
});
//to get saved recipies
router.get("/savedRecipes/ids/:userID", async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.userID);
    res.json({ savedRecipies: user?.savedRecipies });
  } catch (err) {
    res.json(err);
  }
});
router.get("/savedRecipes/:userID", async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.userID);
    const savedRecipes = await RecipeModel.find({
      _id: {
        $in: user.savedRecipies,
      },
    });

    res.json({ savedRecipies: savedRecipes });
  } catch (err) {
    res.json(err);
  }
});
export { router as RecipesRouter };
