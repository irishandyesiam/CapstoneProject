import axios from "axios";
import useAuth from "../../hooks/useAuth";
import React from "react";
import "./RecipeDisplayPage";
import "./RecipeDisplayPage.css";

const RecipeDisplay = (props) => {
  console.log("Recipes to display", props);

  const [user, token] = useAuth();

  async function addRecipe(recipe) {
    console.log(recipe);
    // Create POST request to Recipe database
    //POST To mealplan
    //Loop through ingrdients and POST each ingredient to shopping list
    let name = recipe.name;
    let ingredients = JSON.stringify(recipe.ingredients);
    
    let instructions = JSON.stringify(recipe.instructions);
    
    // debugger
    try {
      let response = await axios.post(
        `http://127.0.0.1:8000/api/recipes/${user.id}/`,
        name, ingredients, instructions,
        {
          headers: {
            Authorization: "Bearer " + token,
          }
        }
      );

      if (response.status === 201) {
        console.log(recipe);
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
          src={props.passed_recipe.image}
          alt={"unavailable"}
        />
        <h3 className="name">{props.passed_recipe.name}</h3>
        {props.passed_recipe.ingredients &&
          props.passed_recipe.ingredients.map((el) => {
            return (
              <ul>
                <li>{el}</li>
              </ul>
            );
          })}
        <li>{props.passed_recipe.instructions}</li>
        <li>{props.passed_recipe.servings}</li>
        <button type="submit" onClick={() => addRecipe(props.passed_recipe)}>
          Add to Recipe List
        </button>
        <button type="submit">Add to Favorite</button>
      </div>
    </div>
  );
};

export default RecipeDisplay;
