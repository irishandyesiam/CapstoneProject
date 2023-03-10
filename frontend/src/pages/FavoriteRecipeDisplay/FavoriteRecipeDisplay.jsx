import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { useParams } from "react-router-dom";
import CommentsForm from "../../components/CommentsForm/CommentsForm"
import Comments from "../../components/Comments/Comments"
import "./FavoriteRecipeDisplay.css";


const FavoriteRecipeDisplay = (favorite_recipe) => {
  const [user, token] = useAuth();
  const [listFavoriteRecipe, setFavoriteRecipes] = useState(null);
  const fav_rec = useParams()
  
  useEffect(() => {
    fetchFavorites();
    addNewComment();
  }, []);
  

  async function addNewComment(newComment)
  {
    let comments = newComment.comments;
    let recipe_id = listFavoriteRecipe.recipe.id;

    let putComment = {
      text: comments,
      recipe_id: recipe_id
    };
    console.log("Post Comment", putComment);
  
    try {
      let response = await axios.post(
        `http://127.0.0.1:8000/api/comment/`,
        putComment,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
        console.log(response.data);
    } catch (error) {
      console.log(error.response.data);
    }
  }

  

  async function fetchFavorites(){
    try{
      console.log("Line 59 FavoriteRecipeDisplay", fav_rec)
    let response = await axios.get(`http://127.0.0.1:8000/api/favorite_recipe/${fav_rec.id}/`,{
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    setFavoriteRecipes(response.data);
    } catch(ex){
    console.log(`ERROR in fetchFavorites EXCEPTION: ${ex}`);
    }
  }

  function parseIngredients() {
    let ingredients_list = JSON.parse(listFavoriteRecipe.recipe.ingredients)
    return ingredients_list
  }

  function recipeInstructionParse() {
    let instructions_list = JSON.parse(listFavoriteRecipe.recipe.instructions)
    return instructions_list
  }

  return (
    
    <div>
      {listFavoriteRecipe && 
        <div>
          <img
            className="favorite-img"
            src={listFavoriteRecipe.recipe.image}
            alt={"unavailable"}
          />
          <h1>{listFavoriteRecipe.recipe.name}</h1><br></br>
          <h2>Ingredients</h2>
          <div>{parseIngredients().map((el) => (
            <ul key={el} >{el}</ul>
          ))}</div><br></br>
          <h2>Instructions</h2>
        <div>{recipeInstructionParse()}</div>
          <h1>Comments</h1>
        </div>
      }
      <div><CommentsForm addNewComment={addNewComment} /></div>
      <h1>User Comments</h1>
      <div><Comments listFavoriteRecipe={listFavoriteRecipe}/></div>
    </div>
    
  );
};

export default FavoriteRecipeDisplay;
