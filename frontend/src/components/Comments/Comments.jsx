import React from 'react';
import {useState} from 'react'; 
import useAuth from '../../hooks/useAuth';
import axios from 'axios';

const GetComment = () => {
    const [user, token] = useAuth();
    const [comments, setComments] = useState([]);

useEffect (() => {
    const fetchComments = async () => {
        try {
            // New url end point to get by id.
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

console.log(comments)
return (
    <div>
    Users Comments
    </div>
)
}

export default GetComment;