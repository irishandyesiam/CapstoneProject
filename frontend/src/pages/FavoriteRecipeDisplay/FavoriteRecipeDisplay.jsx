import React from "react";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import axios from "axios";

const FavoriteRecipeDisplay = (favorite_recipe) => {

  return (
    <div>
      {favorite_recipe.favorite_recipe.recipe?.image && (
        <div>
          <img
            className="img"
            src={favorite_recipe.favorite_recipe.recipe.image}
            alt={"unavailable"}
          />
          <h1>{favorite_recipe.favorite_recipe.recipe.name}</h1>
        </div>
      )}
    </div>
  );
};

export default FavoriteRecipeDisplay;
