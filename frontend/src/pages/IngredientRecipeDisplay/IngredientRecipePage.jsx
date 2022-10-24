import axios from "axios";
import useAuth from "../../hooks/useAuth";
import React from "react";
import "./IngredientRecipePage";
import "./IngredientRecipePage.css";


const IngredientRecipeDisplay = (recipe) => {
  console.log("Ingredient Recipes to display", recipe);
  console.log("Ingredient image", recipe.passed_ing_recipe.thumbnail_url);
  console.log("Ingredients ???", recipe.passed_ing_recipe.sections[0].components);
  console.log("Instructions ", recipe.passed_ing_recipe.instructions);
 
  const [token] = useAuth();
 
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

  
    let name = recipe.passed_ing_recipe.name;
    let ingredients = recipe.passed_ing_recipe.sections[0].components
    let instructions = recipe.passed_ing_recipe.instructions
    let image = recipe.passed_ing_recipe.thumbnail_url;

    let revisedRecipe = {
      name,
      ingredients,
      instructions,
      image,
    };

    // debugger
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

  return (
    <div class="img-gallery">
      <div className="img-box">
        <img
          className="img"
          src={recipe.passed_ing_recipe.thumbnail_url}
          alt={"unavailable"}
        />
        <h3 className="name">{recipe.passed_ing_recipe.name}</h3><br></br>
        <h2>Ingredients</h2>
        {recipe.passed_ing_recipe.sections[0].components &&
          recipe.passed_ing_recipe.sections[0].components.map((el) => {
            return (
              <ul>
                <li>{el.raw_text}</li>
              </ul>
            )
          })}<br></br>
         <h2>Instructions</h2> 
        {recipe.passed_ing_recipe.instructions && recipe.passed_ing_recipe.instructions.map((e) => {
          return (
            <ul>
              <li>{e.display_text}</li>
            </ul>
          )
        })

        }
        
        {/* <li>{recipe.passed_dish_recipe.servings}</li> */}
        <br></br>
        <button type="submit" onClick={() => addRecipe(recipe.passed_dish_recipe)}>
          Add to Meal Plan
        </button>

        <button type="submit">Add to Favorite</button>
      </div>
    </div>
  );
};

export default IngredientRecipeDisplay;