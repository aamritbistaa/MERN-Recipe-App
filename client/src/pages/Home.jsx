import React, { useEffect, useState } from "react";
import axios from "axios";
import { useGetUserId } from "../utils";
import { useCookies } from "react-cookie";
const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [savedRecipies, setSavedRecipies] = useState([]);
  const [cookies, setCookies] = useCookies(["access_token"]);

  const userID = useGetUserId();

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await axios.get("http://localhost:8000/recipes");
        setRecipes(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    const fetchSavedRecipe = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/recipes/savedRecipes/ids/${userID}`
        );
        setSavedRecipies(response.data.savedRecipies);
      } catch (err) {
        console.log(err);
      }
    };

    fetchRecipe();

    if (cookies.access_token) {
      fetchSavedRecipe();
    }
  }, []);

  const handleSaveRecipe = async (recipeID) => {
    try {
      const response = await axios.put(
        "http://localhost:8000/recipes",
        {
          recipeID,
          userID,
        },
        {
          headers: { authorization: cookies.access_token },
        }
      );
      setSavedRecipies(response.data.savedRecipies);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="home-wrapper">
      <div style={{ width: "80%" }}>
        <h2
          style={{ margin: "20px", display: "flex", justifyContent: "center" }}>
          Recipies
        </h2>
        <ul>
          {recipes &&
            recipes.map((item) => (
              <li key={item._id}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 10,
                  }}>
                  <h3 style={{ textTransform: "capitalize" }}>{item.name}</h3>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}>
                    <div
                      style={{
                        fontWeight: 500,
                      }}>
                      {item.cookingTime} minutes
                    </div>
                    {cookies.access_token &&
                      (!savedRecipies.includes(item._id) ? (
                        <button
                          onClick={() => handleSaveRecipe(item._id)}
                          style={{
                            marginLeft: 20,
                            padding: "3px 5px",
                            backgroundColor: "red",
                            color: "white",
                            border: "none",
                          }}>
                          Save
                        </button>
                      ) : (
                        <div style={{ fontWeight: 600, color: "red" }}>
                          Saved
                        </div>
                      ))}
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

export default Home;
