import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './InspirePage.css';

const InspirePageDisplay = (props) => {

    console.log(props.ingredient_search);
  
    
    let navigate = useNavigate();

    function handleIngredientOnClick(ingredient_recipe) {
        props.passedIngredientRecipe(ingredient_recipe)
        navigate('/inspire_display')
      }

return (

    <div class="img-gallery">
        {props.ingredient_search.map((el, index) => {
          return (
            <div className="img-box">
              <img className="img" key={index} src={el.thumbnail_url} alt={"unavailable"} onClick={() => handleIngredientOnClick(el)} />
              <h3 className="name">{el.name}</h3>
              <h3>{el.id}</h3>
            </div>
          );
        })}
      </div>
  );

};

export default InspirePageDisplay;