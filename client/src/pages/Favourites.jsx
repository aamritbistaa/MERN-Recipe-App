import React, { useState, useEffect } from "react";
import axios from "axios";
import { useGetUserId } from "../utils";

const Favourites = () => {
  const [savedRecipies, setSavedRecipies] = useState([]);

  const userID = useGetUserId();

  useEffect(() => {
    const fetchSavedRecipe = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/recipes/savedRecipes/${userID}`
        );
        setSavedRecipies(response.data.savedRecipies);
      } catch (err) {
        console.log(err);
      }
    };
    fetchSavedRecipe();
  }, []);

  return (
    <div className="home-wrapper">
      <div style={{ width: "80%" }}>
        <h2
          style={{ margin: "20px", display: "flex", justifyContent: "center" }}>
          Saved Recipies{" "}
        </h2>
        <ul>
          {savedRecipies &&
            savedRecipies.map((item) => (
              <li key={item._id}>
                <div
                  style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  <h3 style={{ textTransform: "capitalize" }}>{item.name}</h3>

                  <div style={{ fontWeight: 500 }}>
                    {item.cookingTime} minutes
                  </div>
                  <div>
                    {item.ingredients.map((ing) => (
                      <span
                        style={{
                          backgroundColor: "yellow",
                          color: "red",
                          marginRight: 5,
                        }}>
                        ing
                      </span>
                    ))}
                  </div>

                  <div>{item.instructions}</div>
                </div>
                <div>
                  <img src={item.imageUrl} alt="image" />
                </div>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default Favourites;
