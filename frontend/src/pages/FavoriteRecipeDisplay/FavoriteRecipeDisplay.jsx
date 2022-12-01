import React from "react";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import axios from "axios";

const FavoriteRecipeDisplay = () => {
    const [user, token] = useAuth();
    const [recipes, setRecipes] = useState([]);
    console.log(user)
    console.log(token)

    useEffect(() =>{
        const fetchRecipes = async () => {
            try {
                let response = await axios.get("http://127.0.0.1:8000/api/recipes/", {
                    headers: {
                      Authorization: "Bearer " + token,
                    },
                  });
                  setRecipes(response.data);
            } catch (error) {
                console.log(error.response.data);
            }
        };
        fetchRecipes();
    }, [token]);
    return (
        <div className="container">
      <h1>{user.username} Favorites </h1><br></br>
      {recipes &&
        recipes.map((recipes) => (
          <p key={recipes.id} >
            {recipes.name} 
          </p>
        ))}
    </div>
    );
};

export default FavoriteRecipeDisplay