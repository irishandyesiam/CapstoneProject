
import "./FavoritesPage.css";
import CommentsForm from "../../components/CommentsForm/CommentsForm";
import useAuth from "../../hooks/useAuth";
import { useEffect, useState } from "react";
import axios from "axios";

const DisplayFavorites = (props) => {
  const [user, token] = useAuth();
  const [addedComment, setNewComment] = useState([]);

  console.log(props);
  console.log(props.recipes);
  console.log(addedComment);

  

  useEffect(() => {
    // submitNewComment();
  }, []);

  async function addNewComment(newComment){
    let response = newComment
    setNewComment(response)
  } 
  
  // async function submitNewComment(addedComment)
  // {
  //   console.log("testing", addedComment);
  //   let recipe = props.recipes;
  //   let rating = 2;
  //   let comments = addedComment;

  //   let putComment = {
  //     recipe,
  //     rating,
  //     comments,
  //   };
  //   console.log(putComment);
  
  //   console.log("Put Comment", putComment);
  //   try {
  //     let response = await axios.post(
  //       "http://127.0.0.1:8000/api/favorite_recipe/comment/",
  //       putComment,
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
    return (
      <div className="container">
        {props &&
          props.recipes.map((recipes) => (
            <p key={recipes.id}>
              <li> {recipes.recipe} </li>
              <p> {recipes.comments} </p>
              <CommentsForm addNewComment={addNewComment} />
            </p>
          ))}
      </div>
    )
  }

export default DisplayFavorites;
