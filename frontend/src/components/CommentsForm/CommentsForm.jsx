import React from 'react';
import {useState} from 'react';


const AddComment = (props) => {



const [comment, setComment] = useState([]);

    function handleSubmit(event) {
        event.preventDefault();
        const newComment = {
            comments: comment,
        };
        props.addNewComment(newComment)
        console.log("input", newComment)
    }

return (
    <div>
    <form onSubmit={handleSubmit}>
      <input type='text' value={comment} placeholder="Comment..." onChange={(event) => setComment(event.target.value)}/>
      <button type='submit'>Add Comment</button>
    </form>
    </div>
)
}
export default AddComment;