import React, { useState } from "react";
import axios from "axios";
import { useGetUserId } from "../utils";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
const Create = () => {
  const UserID = useGetUserId();

  const navigate = useNavigate();
  const [cookies, setCookies] = useCookies(["access_token"]);

  const [recipe, setRecipe] = useState({
    name: "",
    ingredients: [],
    instructions: "",
    imageUrl: "",
    cookingTime: 0,
    description: "",
    Creator: UserID,
  });

  const handleChange = (e) => {
    setRecipe({ ...recipe, [e.target.name]: e.target.value });
  };
  const handleIngredientsChange = (e, i) => {
    const { value } = e.target;
    const ingredients = recipe.ingredients;
    ingredients[i] = value;
    setRecipe({ ...recipe, [ingredients]: ingredients });
  };

  const AddIngredient = (e) => {
    setRecipe({ ...recipe, ingredients: [...recipe.ingredients, ""] });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const data = await axios.post("http://localhost:8000/recipes", recipe, {
        headers: { authorization: cookies.access_token },
      });
      console.log(data);
      navigate("/");
      alert("Recipe Created");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="auth-wrapper">
      <form onSubmit={handleSubmit} style={{ width: "70%" }}>
        <h2>Create Recipe</h2>

        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          onChange={handleChange}
          required
        />

        <label htmlFor="ingredients">Ingredients</label>

        <button onClick={AddIngredient} type="button">
          Add Ingredient
        </button>
        {recipe.ingredients.map((item, index) => (
          <input
            key={index}
            type="text"
            id="ingredients"
            name="ingredients"
            value={item}
            onChange={(e) => handleIngredientsChange(e, index)}
            required
          />
        ))}

        <label htmlFor="instructions">Instructions</label>
        <textarea
          id="instructions"
          name="instructions"
          onChange={handleChange}
          rows={4}
          cols={20}
        />

        <label htmlFor="imageUrl">Image Url</label>
        <input
          type="text"
          id="imageUrl"
          name="imageUrl"
          onChange={handleChange}
          required
        />

        <label htmlFor="cookingTime">Cooking Time</label>
        <input
          type="number"
          id="cookingTime"
          name="cookingTime"
          onChange={handleChange}
          required
        />

        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          onChange={handleChange}
          rows={6}
          cols={20}
          required
        />

        <button type="submit">Create Recipe</button>
      </form>
    </div>
  );
};

export default Create;
