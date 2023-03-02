import React from 'react';
import {useEffect, useState} from 'react'; 
import useAuth from '../../hooks/useAuth';
import axios from 'axios';

const GetComment = (props) => {
console.log("Comments component props",props.recipes.id)
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
    {comments && comments.filter((e) => e.recipes.id.includes(props.recipes.id)(
        <li>{e.text}</li>
    ))}

    </div>
)
}

export default GetComment;