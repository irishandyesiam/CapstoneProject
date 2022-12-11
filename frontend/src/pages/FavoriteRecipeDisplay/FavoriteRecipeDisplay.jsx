import React from "react";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import CommentsForm from "../../components/CommentsForm/CommentsForm"

const FavoriteRecipeDisplay = (favorite_recipe) => {
  const [user, token] = useAuth();
  const [addedComment, setNewComment] = useState([]);
  useEffect(() => {
    addNewComment();
  }, []);
  
  async function addNewComment(newComment)
  {
    console.log("Input form comment", newComment);
    
    let recipe = favorite_recipe.favorite_recipe.recipe.id;
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
      let response = await axios.put(
        `http://127.0.0.1:8000/api/favorite_recipe/${recipe}/`,
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
  

  return (
    <div>
      {favorite_recipe.favorite_recipe.recipe?.image && (
        <div>
          <img
            className="img"
            src={favorite_recipe.favorite_recipe.recipe.image}
            alt={"unavailable"}
          />
          <h1>{favorite_recipe.favorite_recipe.recipe.name}</h1>
          <h3>{favorite_recipe.favorite_recipe.comments}</h3>
          <div><CommentsForm addNewComment={addNewComment} /></div>
        </div>
      )}
    </div>
  );
};

export default FavoriteRecipeDisplay;
