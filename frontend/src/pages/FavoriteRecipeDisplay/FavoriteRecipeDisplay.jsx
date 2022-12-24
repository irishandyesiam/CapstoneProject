import React from "react";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import CommentsForm from "../../components/CommentsForm/CommentsForm"
import { useParams } from "react-router-dom";


const FavoriteRecipeDisplay = (favorite_recipe) => {
  const [user, token] = useAuth();
  const [addedComment, setNewComment] = useState([]);
  const [listFavoriteRecipe, setFavoriteRecipes] = useState(null);
  const [filteredByIdFavorite, setFilterById] = useState([]);
  const [someObject, setSomeObject] = useState(null)
  useEffect(() => {
    fetchFavorites();
    addNewComment();
    // filterById();
  }, []);
  

  async function addNewComment(newComment)
  {
    console.log("Input form comment", newComment);
    let comments = newComment.comments;
    let rating = 5; 
    let recipe_id = idForRecipe;

    let putComment = {
      rating: rating,
      comments: comments,
      recipe_id: recipe_id
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

  
  let fav_rec = useParams()
  console.log(fav_rec.id)
  async function fetchFavorites(){
    try{
    let response = await axios.get(`http://127.0.0.1:8000/api/favorite_recipe/${fav_rec.id}/`,{
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
  console.log("Fetched favorite recipes", listFavoriteRecipe)

  // async function filterById() {
  // try {
  // let filteredFavoriteList = listFavoriteRecipe.filter((e) => e.recipe.id === favorite_recipe.favorite_recipe.id)
  // console.log("Filtered by id", filteredFavoriteList)
  // setFilterById(filteredFavoriteList)
  // } catch (ex)
  // {
  //   console.log(`ERROR in filterById EXCEPTION: ${ex} `)
  // }
  // }
  

  function parseIngredients() {
    let ingredients_list = JSON.parse(listFavoriteRecipe.recipe.ingredients)
    return ingredients_list
  }

  function recipeInstructionParse() {
    let instructions_list = JSON.parse(listFavoriteRecipe.recipe.instructions)
    return instructions_list
  }
  // let parseIngredients = JSON.parse(favorite_recipe.favorite_recipe.recipe.ingredients)
  console.log(parseIngredients())
  // let instructionsParse = JSON.parse(favorite_recipe.favorite_recipe.recipe.ingredients)
  console.log(recipeInstructionParse())

  return (
    
    <div>
      {/* {listFavoriteRecipe.length > 0 ? listFavoriteRecipe.map(recipe => <p>{recipe.name}</p>) : null} */}
      {/* {someObject && <p>{someObject.someProperty}</p>} */}
      {listFavoriteRecipe && 
        <div>
          <img
            className="img"
            src={listFavoriteRecipe.recipe.image}
            alt={"unavailable"}
          />
          <h1>{listFavoriteRecipe.recipe.name}</h1><br></br>
          <h2>Ingredients</h2>
          <p>{parseIngredients().map((el) => (
            <ul>{el}</ul>
          ))}</p><br></br>
          {/* <h3>{parseIngredients && parseIngredients.map((ele) =>(<p key={ele}><ul>{ele}</ul></p>))}</h3><br></br> */}
          <h2>Instructions</h2>
          <p>{recipeInstructionParse()}</p>
          {/* <h3>{instructionsParse && instructionsParse.map((elem) =>(<p key={elem}><ul>{elem}</ul></p>))}</h3><br></br> */}
          <h1>Comments</h1>
          
        </div>
      }
      <div>
        {/* {filteredByIdFavorite && filteredByIdFavorite.map((el) =>(
          <p key={el.id}>
            <li>{el.comments}</li>
          </p>
        ))} */}
      </div>
      <div><CommentsForm addNewComment={addNewComment} /></div>
    </div>
    
  );
};

export default FavoriteRecipeDisplay;
