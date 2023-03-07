import React from 'react';
import {useEffect, useState} from 'react'; 
import useAuth from '../../hooks/useAuth';
import axios from 'axios';

const GetComment = (props) => {
console.log("Comments component props",props.listFavoriteRecipe)
    const [user, token] = useAuth();
    const [comments, setComments] = useState([]);

useEffect (() => {
    // Fetch all comments per user
    const fetchComments = async () => {
        try {
            let response = await axios.get("http://127.0.0.1:8000/api/comment/", {
            headers: {
                Authorization: "Bearer " + token,
            },
            });
    setComments(response.data);
}   catch (error){
    console.log("fetchComments ", error.response.data)
}
}
fetchComments();}, [token]);

console.log("Comment component state", comments)
return (
    <div>
    {/* Display comments by flitering through by FK */}
    Users Comments
    {/* Try filtering through comments in function before return */}
    {/* {comments && comments.filter(((e => e.recipe.id === props.listFavoriteRecipe.recipe.id).map(((e) => (
        <li>{e.text}</li>
    )))))} */}
    {/* {comments && comments.map(comment =>
         {return <div key={comment.id}>{comment.text}</div>}
    )} */}
    {comments && comments.filter((comment) => comment.recipe.id === props.listFavoriteRecipe.recipe.id).map((comment) => {
        return <div key={comment.text}>{comment.text}</div>
    })}
    </div>
)
}

export default GetComment;