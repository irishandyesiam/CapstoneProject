import React from "react";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import axios from "axios";

const FavoriteRecipeDisplay = (favorite_recipe) => {
    console.log(favorite_recipe.favorite_recipe.recipe.name);
    return (
      <div>
        <h1>{favorite_recipe.favorite_recipe.recipe.name}</h1>
       </div>
    );
}

export default FavoriteRecipeDisplay