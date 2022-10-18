import React, { userState } from "react";
import './SearchResultsDisplay.css'
import { useNavigate } from 'react-router-dom';

const SearchResultsDisplay = (props) => {
  console.log(props.recipes);

  let navigate = useNavigate();

  return (
    <div class="img-gallery">
      {props.recipes.map((el) => {
        return (
          <div className="img-box">
            <img className="img" src={el.image} alt={"unavailable"} onClick={() => navigate(`/display_recipe/${el.name}`)}/>
            <h3 className="name">{el.name}</h3>
          </div>
        );
      })}
    </div>
  );
};

export default SearchResultsDisplay;
