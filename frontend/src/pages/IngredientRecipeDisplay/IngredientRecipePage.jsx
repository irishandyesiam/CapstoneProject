import axios from "axios";
import useAuth from "../../hooks/useAuth";
import React from "react";
import "./IngredientRecipePage";
import "./IngredientRecipePage.css";


const IngredientRecipeDisplay = (recipe) => {
  console.log("Ingredient Recipes to display", recipe);
  console.log("Ingredient image", recipe.passed_ing_recipe.thumbnail_url);
  console.log("Ingredients ???", recipe.passed_ing_recipe.recipes[0].sections[0].components);
  console.log("Instructions ", recipe.passed_ing_recipe.recipes[0].instructions);
 
  const [user, token] = useAuth();
 
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

  async function addRecipe(add_recipe) {
    console.log(add_recipe);

  
    let name = recipe.passed_ing_recipe.name;
    console.log(name);
    let ingredients_pull = recipe.passed_ing_recipe.sections[0].components.map((el) => {
      return (el.raw_text)
    });
    console.log(ingredients_pull);
    let ingredients = JSON.stringify(ingredients_pull);
    console.log(ingredients);
    let instructions_pull = recipe.passed_ing_recipe.instructions.map((e) => {
      return (e.display_text)
    });
    console.log(instructions_pull);
    let instructions = JSON.stringify(instructions_pull);
    console.log(instructions);
    let image = recipe.passed_ing_recipe.thumbnail_url;
    console.log(image);

    let revisedRecipe = {
      image: image,
      ingredients: ingredients,
      instructions: instructions,
      name: name,
    };
    console.log(revisedRecipe);
    // debugger
    try {
      let response = await axios.post(
        `http://127.0.0.1:8000/api/recipes/recipe-detail/`,
       
        revisedRecipe,
       
        {
          headers: {
            Authorization: `Bearer ${token}`,
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



  async function ingredientsList(recipe) {
    console.log("Ingredients List", recipe);
    let x = recipe.sections[0].components.map((el) => {
      return (el.ingredient.name)
    });
    console.log(x)
    
     x.map(async (el) => {
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
        console.log(response);
      } catch (error) {
        
        console.log(error.response.data);
      }
    });
    
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
        {recipe.passed_ing_recipe.recipes[0].sections[0].components &&
          recipe.passed_ing_recipe.recipes[0].sections[0].components.map((el) => {
            return (
              <ul>
                <li>{el.raw_text}</li>
              </ul>
            )
          })}<br></br>
         <h2>Instructions</h2> 
        {recipe.passed_ing_recipe.recipes[0].instructions && recipe.passed_ing_recipe.recipes[0].instructions.map((e) => {
          return (
            <ul>
              <li>{e.display_text}</li>
            </ul>
          )
        })

        }
        
        {/* <li>{recipe.passed_dish_recipe.servings}</li> */}
        <br></br>
        <button type="submit" onClick={() => addRecipe(recipe.passed_ing_recipe)}>
          Add to Meal Plan
        </button>
        <button
          type="submit"
          onClick={() => ingredientsList(recipe.passed_ing_recipe)}
        >
          Add Ingredients to Shopping List
        </button>
        
      </div>
    </div>
  );
};

export default IngredientRecipeDisplay;