import React from 'react';
import axios from 'axios';
import {useEffect, useState} from 'react'; 
import useAuth from '../../hooks/useAuth';

const GetComment = (props) => {
    const [user, token] = useAuth();
    const [comments, setComments] = useState([]);


// Move to FavoriteRecipeDisplay page. 
useEffect (() => {
    const fetchComments = async () => {
        try {
            let response = await axios.get("http://127.0.0.1:8000/api/comment/", {
            headers: {
                Authorization: "Bearer " + token,
            },
            });
    setComments(response.data);
}   catch (error){
    console.log("fetchComments error", error.response.data)
}
}
fetchComments();}, []);


return (
    <div>
    {console.log("Comments components state re-render", comments)}
    {comments && comments.filter((comment) => comment.recipe.id === props.listFavoriteRecipe.recipe.id).map((comment) => {
        return (
        <div key={comment.text}>{comment.text}</div>
        )
    })}
    </div>
)
}

export default GetComment;