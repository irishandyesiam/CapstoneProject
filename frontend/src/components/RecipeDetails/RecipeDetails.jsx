import React from 'react';
import { useState } from 'react';

const RecipeDetails = () => {
    const [toggle, setToggle] = useState(true);


const handleClick = () => {
    setToggle(!toggle);
};

return (
    <div>
            <button 
            onClick={handleClick} 
            class="btn btn-info mb-5">
            {toggle ? "Less" : "More"}
            </button>

            {toggle ?
                <ul class="list-group">
                <li class="list-group-item">{recipes.ingredients}</li>
                <li class="list-group-item">{recipes.instructions}</li>
                </ul>
                :
                <></>
            }
            </div>
)
}

export default RecipeDetails;