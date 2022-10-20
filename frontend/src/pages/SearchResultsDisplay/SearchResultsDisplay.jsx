import React, { useState } from "react";
import './SearchResultsDisplay.css'
import { useNavigate } from 'react-router-dom';

const SearchResultsDisplay = (props) => {
  console.log(props.recipes);

  let navigate = useNavigate();

  const [recipe_index, setRecipeIndex] = useState('')

  function handleOnClick(recipe) {
    console.log(recipe)
 
    // event.preventDefault();
    props.passedRecipe(recipe)
    navigate('/display_recipe')
  }

  return (
    <div class="img-gallery">
      {props.recipes.map((el, index) => {
        return (
          <div className="img-box">
            <img className="img" key={index} src={el.image} alt={"unavailable"} onClick={() => handleOnClick(el)}/>
            <h3 className="name">{el.name}</h3>
          </div>
        );
      })}
    </div>
  );
};

export default SearchResultsDisplay;
