
import "./FavoritesPage.css";
import CommentsForm from "../../components/CommentsForm/CommentsForm";
import useAuth from "../../hooks/useAuth";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const DisplayFavorites = (props) => {
  const [user, token] = useAuth();
  const [addedComment, setNewComment] = useState([]);
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);

  console.log(user);
  console.log(token);
  console.log(props);
  console.log(props.recipe);
  console.log(favoriteRecipes)
  
  // console.log(addedComment);

  

  // useEffect(() => {
  //   addNewComment();
  // }, []);

  // async function addNewComment(newComment){
  //   console.log(newComment)
  //   let response = await axios.put(
  //         "http://127.0.0.1:8000/api/favorite_recipe/comment/",
  //         newComment,
  //         {
  //           headers: {
  //             Authorization: "Bearer " + token,
  //           },
  //         }
  //       )
  //   console.log(response)
  // } 
  
  // async function addNewComment(newComment)
  // {
  //   console.log("testing", newComment);
  //   let recipe = props.recipes;
  //   let rating = 2;
  //   let comments = newComment;

  //   let putComment = {
  //     recipe,
  //     rating,
  //     comments,
  //   };
  //   console.log(putComment);
  
  //   console.log("Post Comment", putComment);
  //   try {
  //     let response = await axios.put(
  //       "http://127.0.0.1:8000/api/favorite_recipe/comment/",
  //       addedComment,
  //       {
  //         headers: {
  //           Authorization: "Bearer " + token,
  //         },
  //       }
  //     );
  //     console.log(response.data);
  //   } catch (error) {
  //     console.log(error.response.data);
  //   }
  // }
  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        let response = await axios.get(
          "http://127.0.0.1:8000/api/favorite_recipe/",
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );
        setFavoriteRecipes(response.data);
        console.log(response)
      } catch (error) {
        console.log(error.response.data);
      }
    };
    fetchFavorites();
  }, [token]);

  let navigate = useNavigate();

  function handleFavoriteId(fav_recipe) {
    console.log("Navigate to favorite recipe display", fav_recipe.id)
    props.passedFavoriteId(fav_recipe)
    navigate('/favorite_recipe_display/')
  }

return (
      <div className="container">
        {favoriteRecipes &&
          favoriteRecipes.map((recipes) => (
            <p key={recipes.id}><br></br>
              <li onClick={() => navigate(`/favorite_recipe_display/${recipes.recipe.id}`)}> {recipes.recipe.name}  </li>
              <img
                className="img"
                src={recipes.recipe.image}
                alt={"unavailable"}
              />
              {/* <p> {recipes.comments} </p>
              <CommentsForm addNewComment={addNewComment} /> */}
            </p>
          ))}
      </div>
    )
  
}

export default DisplayFavorites;
