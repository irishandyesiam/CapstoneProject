
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
      <div className="img-gallery">
        {favoriteRecipes &&
          favoriteRecipes.map((element) => (
            <div key={element.id}><br></br>
            <div className="img-box">
              
              <img
                className="img"
                src={element.recipe.image}
                alt={"unavailable"}
                onClick={() => navigate(`/favorite_recipe_display/${element.id}`)}
              />
              <h3 className="name" > {element.recipe.name}  </h3>
              </div>
              
              {/* <p> {recipes.comments} </p>
              <CommentsForm addNewComment={addNewComment} /> */}
            </div>
          ))}
      </div>
    )
  
}

export default DisplayFavorites;
