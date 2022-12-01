
import "./FavoritesPage.css";
import CommentsForm from "../../components/CommentsForm/CommentsForm";
import useAuth from "../../hooks/useAuth";
import { useEffect, useState } from "react";
import axios from "axios";

const DisplayFavorites = (props) => {
  const [user, token] = useAuth();
  const [addedComment, setNewComment] = useState([]);

  console.log(props);
  console.log(props.recipe);
  // console.log(addedComment);

  

  useEffect(() => {
    addNewComment();
  }, []);

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
  
  async function addNewComment(newComment)
  {
    console.log("testing", newComment);
    let recipe = props.recipes;
    let rating = 2;
    let comments = newComment;

    let putComment = {
      recipe,
      rating,
      comments,
    };
    console.log(putComment);
  
    console.log("Post Comment", putComment);
    try {
      let response = await axios.put(
        "http://127.0.0.1:8000/api/favorite_recipe/comment/",
        addedComment,
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
      <div className="container">
        {props &&
          props.recipes.map((recipes) => (
            <p key={recipes.recipe.id}>
              <li> {recipes.recipe.name} </li>
              <img
                className="img"
                src={recipes.recipe.image}
                alt={"unavailable"}
              />
              <p> {recipes.comments} </p>
              <CommentsForm addNewComment={addNewComment} />
            </p>
          ))}
      </div>
    )
  
}

export default DisplayFavorites;
