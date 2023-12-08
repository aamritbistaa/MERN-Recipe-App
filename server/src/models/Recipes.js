import mongoose from "mongoose";

const RecipeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },

  ingredients: [
    {
      type: String,
      required: true,
    },
  ],
  instructions: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  cookingTime: {
    type: Number,
    required: true,
  },
  Creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
});
//table named users with type as defined by UserSchema

export const RecipeModel = mongoose.model("recipies", RecipeSchema);
