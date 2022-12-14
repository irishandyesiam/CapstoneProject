import React from "react";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import CommentsForm from "../../components/CommentsForm/CommentsForm"

const FavoriteRecipeDisplay = (favorite_recipe) => {
  const [user, token] = useAuth();
  const [addedComment, setNewComment] = useState([]);
  const [listFavoriteRecipe, setFavoriteRecipes] = useState([]);
  const [filteredByIdFavorite, setFilterById] = useState([]);
  useEffect(() => {
    addNewComment();
    fetchFavorites();
    filterById();
    
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
    console.log("setFavoriteRecipe data", response.data)
    setFavoriteRecipes(response.data);
    } catch(ex){
    console.log(`ERROR in getFavoriteRecipes EXCEPTION: ${ex}`);
    }
  }
  console.log(listFavoriteRecipe)

  async function filterById() {
  try {
  let filteredFavoriteList = listFavoriteRecipe.filter((e) => e.recipe.id === favorite_recipe.favorite_recipe.id)
  console.log("Filtered by id", filteredFavoriteList)
  setFilterById(filteredFavoriteList)
  } catch (ex)
  {
    console.log(`ERROR in filterById EXCEPTION: ${ex} `)
  }
  }

  function parseIngredients(favorite_recipe) {
    let ingredients_list = JSON.parse(favorite_recipe.favorite_recipe.recipe.ingredients)
    return ingredients_list
  }

  function recipeInstructionParse(favorite_recipe) {
    let instructions_list = JSON.parse(favorite_recipe.favorite_recipe.recipe.instructions)
    return instructions_list
  }
  // let parseIngredients = JSON.parse(favorite_recipe.favorite_recipe.recipe.ingredients)
  // console.log(parseIngredients)
  // let instructionsParse = JSON.parse(favorite_recipe.favorite_recipe.recipe.ingredients)
  // console.log(instructionsParse)

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
          <ul>{parseIngredients()}</ul><br></br>
          {/* <h3>{parseIngredients && parseIngredients.map((ele) =>(<p key={ele}><ul>{ele}</ul></p>))}</h3><br></br> */}
          <h2>Instructions</h2>
          <ul>{recipeInstructionParse()}</ul>
          {/* <h3>{instructionsParse && instructionsParse.map((elem) =>(<p key={elem}><ul>{elem}</ul></p>))}</h3><br></br> */}
          <h1>Comments</h1>
          
        </div>
      )}
      <div>
        {filteredByIdFavorite && filteredByIdFavorite.map((el) =>(
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
