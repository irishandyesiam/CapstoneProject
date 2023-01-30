import React from 'react';
import { useState } from 'react';

const RecipeDetails = (props) => {
    console.log("Is anything getting passed", props.recipes)
    const [toggle, setToggle] = useState(true);
    const [recipeDetails, setRecipeDetails] = useState;


const handleClick = (event) => {
    setToggle(!toggle);
    console.log("OnClick event data", event)
    setRecipeDetails();
};

return (
    <div>
            <button value={recipeDetails}
            onClick={(event) => handleClick(setRecipeDetails(event.target.value))} 
            class="btn btn-info mb-5">
            {toggle ? "Less" : "More"}
            </button>

            {toggle ?
                <ul class="list-group">
                <li class="list-group-item">{props.recipeDetails}</li>
                <li class="list-group-item">Value Two</li>
                </ul>
                :
                <></>
            }
            </div>
)
}

export default RecipeDetails;