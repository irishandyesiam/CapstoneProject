import React, { userState } from "react";
import './SearchResultsDisplay.css'

const SearchResultsDisplay = (props) => {
  console.log(props.recipes);

  return (
    <div class="img-gallery">
      {props.recipes.map((el) => {
        return (
          <div className="img-box">
            <img className="img" src={el.image} alt={"unavailable"}/>
            <h3 className="name">{el.name}</h3>
          </div>
        );
      })}
    </div>
  );
};

export default SearchResultsDisplay;
