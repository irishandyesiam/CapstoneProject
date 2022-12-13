import React from "react";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import CommentsForm from "../../components/CommentsForm/CommentsForm"

const FavoriteRecipeDisplay = (favorite_recipe) => {
  const [user, token] = useAuth();
  const [addedComment, setNewComment] = useState([]);
  const [listFavoriteRecipe, setFavoriteRecipes] = useState([]);
  useEffect(() => {
    addNewComment();
    fetchFavorites();
  }, []);
  
  async function addNewComment(newComment)
  {
    console.log("Input form comment", newComment);
    
    let recipe = favorite_recipe.favorite_recipe.id;
    let rating = 5; 
    let comments = newComment.comments;
    console.log(favorite_recipe.favorite_recipe.id)

    let putComment = {
      recipe_id: recipe,
      rating: rating,
      comments: comments,
    };
    console.log("Post Comment", putComment);
  
    try {
      let response = await axios.post(
        `http://127.0.0.1:8000/api/favorite_recipe/comment/`,
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
    let response = await axios.get(`http://127.0.0.1:8000/api/favorite_recipe/`,{
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    setFavoriteRecipes(response.data);
    console.log(response.data)
    } catch(ex){
    console.log(`ERROR in getFavoriteRecipes EXCEPTION: ${ex}`);
    }
  }
  console.log(listFavoriteRecipe)

  let filteredFavoriteList = listFavoriteRecipe.filter((e) => e.recipe.id == favorite_recipe.favorite_recipe.id)
  console.log("Filtered by id", filteredFavoriteList)

  let parseIngredients = JSON.parse(favorite_recipe.favorite_recipe.recipe.ingredients)
  console.log(parseIngredients)
  let instructionsParse = JSON.parse(favorite_recipe.favorite_recipe.recipe.instructions)
  console.log(instructionsParse)

  return (
    
    <div>
      {favorite_recipe.favorite_recipe.recipe?.image && (
        <div>
          <img
            className="img"
            src={favorite_recipe.favorite_recipe.recipe.image}
            alt={"unavailable"}
          />
          <h1>{favorite_recipe.favorite_recipe.recipe.name}</h1><br></br>
          <h2>Ingredients</h2>
          <h3>{parseIngredients && parseIngredients.map((ele) =>(<p key={ele}><ul>{ele}</ul></p>))}</h3><br></br>
          <h2>Instructions</h2>
          <h3>{instructionsParse && instructionsParse.map((elem) =>(<p key={elem}><ul>{elem}</ul></p>))}</h3><br></br>
          <h1>Comments</h1>
          
        </div>
      )}
      <div>
        {filteredFavoriteList && filteredFavoriteList.map((el) =>(
          <p key={el.id}>
            <li>{el.comments}</li>
          </p>
        ))}
      </div>
      <div><CommentsForm addNewComment={addNewComment} /></div>
    </div>
    
  );
};

export default FavoriteRecipeDisplay;
