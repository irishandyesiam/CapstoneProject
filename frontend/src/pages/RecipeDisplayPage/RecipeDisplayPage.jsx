import axios from "axios";
import useAuth from "../../hooks/useAuth";
import React from "react";
import "./RecipeDisplayPage";
import "./RecipeDisplayPage.css";

const RecipeDisplay = (props) => {
  console.log("Dish Recipes to display", props);
 

  const [user, token] = useAuth();

  async function ingredientsList(recipe) {
    console.log("Ingredients List", recipe);
     recipe.ingredients.map(async (el) => {
      try {
        let response = await axios.post(
          `http://127.0.0.1:8000/api/shopping_list/`,
          {
            items: el,
          },
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );
       
      } catch (error) {
        console.log(error.response.data);
      }
    });
    
  }

  async function addToMealPlan(recipeId) {
    console.log(recipeId);
    let recipe_meal_plan = {
      day_week: "Monday",
      recipe_id: recipeId,
    };

    try {
      let response = await axios.post(
        `http://127.0.0.1:8000/api/meal_planner/`,
        recipe_meal_plan,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      if (response.status === 201) {
        console.log(recipe_meal_plan);
      }
    } catch (error) {
      console.log(error.response.data);
    }
  }

  async function addRecipe(recipe) {
    console.log(recipe);
    let name = recipe.name;
    let ingredients = JSON.stringify(recipe.ingredients);
    let instructions = JSON.stringify(recipe.instructions);
    let image = recipe.image;

    let revisedRecipe = {
      name,
      ingredients,
      instructions,
      image,
    };

  
    try {
      let response = await axios.post(
        `http://127.0.0.1:8000/api/recipes/recipe-detail/`,
        revisedRecipe,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

      if (response.status === 202) {
        console.log(response.data);
        addToMealPlan(response.data.id);
      }
    } catch (error) {
      console.log(error.response.data);
    }
  }

  async function addToFavorites(favorite_recipe) {
    console.log(favorite_recipe);
    let recipe = favorite_recipe.name;
    // Will need input from customer//
    let rating = 5;
    let comments = "Yum";
    let user_id = user;

    let favoriteContent = {
      recipe,
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

  return (
    <div class="img-gallery">
      <div className="img-box">
        <img
          className="img"
          src={props.passed_dish_recipe.image}
          alt={"unavailable"}
        />
        <h3 className="name">{props.passed_dish_recipe.name}</h3>
        {props.passed_dish_recipe.ingredients &&
          props.passed_dish_recipe.ingredients.map((el) => {
            return (
              <ul>
                <li>{el}</li>
              </ul>
            );
          })}
        <li>{props.passed_dish_recipe.instructions}</li>
        <li>{props.passed_dish_recipe.servings}</li>
        <button type="submit" onClick={() => addRecipe(props.passed_dish_recipe)}>
          Add to Meal Plan
        </button>
        <button
          type="submit"
          onClick={() => ingredientsList(props.passed_dish_recipe)}
        >
          Add Ingredients to Shopping List
        </button>
        <button type="submit" onClick={() => addToFavorites(props.passed_dish_recipe)}>Add to Favorite</button>
      </div>
    </div>
  );
};

export default RecipeDisplay;

