import React from 'react';
import { useState } from 'react';

const RecipeDetails = () => {
    const [toggle, setToggle] = useState(true);


const handleClick = (event) => {
    setToggle(!toggle);
    console.log("OnClick event data", event)
};

return (
    <div>
            <button value={toggle}
            onClick={(event) => handleClick(event.target.value)} 
            class="btn btn-info mb-5">
            {toggle ? "Less" : "More"}
            </button>

            {toggle ?
                <ul class="list-group">
                <li class="list-group-item">Value One</li>
                <li class="list-group-item">Value Two</li>
                </ul>
                :
                <></>
            }
            </div>
)
}

export default RecipeDetails;