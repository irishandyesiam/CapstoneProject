import React from "react";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import "./MealPlan";
import "./MealPlan.css";
import { useNavigate } from "react-router-dom";

const MealPlan = () => {
  const [user, token] = useAuth();
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const fetchMealPlan = async () => {
      try {
        let response = await axios.get(
          "http://127.0.0.1:8000/api/meal_planner/",
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );
        setRecipes(response.data);
      } catch (error) {
        console.log(error.response.data);
      }
    };
    fetchMealPlan();
  }, [token]);

    async function addToFavorites(favorite_recipe) {
      console.log(favorite_recipe);
      let recipe = favorite_recipe.recipe;
      console.log(recipe)
      // Will need input from customer//
      let rating = 5;
      let comments = "Yum";
      let user_id = user;
      let recipe_id = favorite_recipe.recipe.id;

      let favoriteContent = {
        recipe_id,
        rating,
        comments,
        user_id,
      };
      try {
        let response = await axios.post(
          `http://127.0.0.1:8000/api/favorite_recipe/`,
          favoriteContent,
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );
  
        if (response.status === 202) {
          console.log(response.data);
          
        }
      } catch (error) {
        console.log(error.response.data);
      }
    }

    // let navigate = useNavigate();
console.log(recipes)
  return (
    <div className="container">
      <h1>{user.username} Meal Plan</h1>
      {/* navigate currently using PK of meal plan for Param not the recipe FK */}
      {/* onClick={() => navigate(`/favorite_recipe_display/${recipes.id}`)} */}
      {recipes &&
        recipes.map((recipes) => <p key={recipes.id} className="link" >{recipes.recipe.name}<button type="submit" onClick={() => addToFavorites(recipes)}>Add to Favorite</button></p>)}
        
    </div>
  );
};
export default MealPlan;
