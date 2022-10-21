import React from "react";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import "./MealPlan";
import "./MealPlan.css";

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
//create function to loop over ingredients to add to shopping list.//
  return (
    <div className="container">
      <h1>{user.username} Meal Plan</h1>
      {recipes &&
        recipes.map((recipes) => <p key={recipes.id}>{recipes.recipe.name}</p>)}
    </div>
  );
};
export default MealPlan;
