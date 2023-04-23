import React from 'react';
import axios from 'axios';
import {useEffect, useState} from 'react'; 
import useAuth from '../../hooks/useAuth';

const GetComment = (props) => {
    console.log(props);
    const [user, token] = useAuth();



// Move to FavoriteRecipeDisplay page. 
useEffect (() => {
}, []);


// return (
//     <div>
//     {console.log("Comments components state re-render", comments)}
//     {comments && comments.filter((comment) => comment.recipe.id === props.listFavoriteRecipe.recipe.id).map((comment) => {
//         return (
//         <div key={comment.text}>{comment.text}</div>
//         )
//     })}
//     </div>
// )
}

export default GetComment;