import React, { useState } from "react";
import './InspirePage.css';

const InspirePageDisplay = (props) => {

    console.log(props.ingredient_search);
    

    function handleIngredientOnClick(ingredient_recipe) {
        props.passedIngredientRecipe(ingredient_recipe)
        
      }

return (

    <div class="img-gallery">
        {props.ingredient_search.map((el, index) => {
          return (
            <div className="img-box">
              <img className="img" key={index} src={el.thumbnail_url} alt={"unavailable"} onClick={() => handleIngredientOnClick(el)} />
              <h3 className="name">{el.name}</h3>
            </div>
          );
        })}
      </div>
  );

};

export default InspirePageDisplay;