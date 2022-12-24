import React, { useEffect } from 'react';
import { useState, useState } from 'react';
import useAuth from '../../hooks/useAuth';
import axios from 'axios';

const DisplayRecipe = (props) => {
    const [user, token] = useAuth();
    const [userRecipes, setUserRecipes] = useState([]);

useEffect(() => {
    const fetchUserRecipes = async () => {
        try {  
            let response = await axios.get("http://127.0.0.1:8000/api/recipes/", {
            headers: {
              Authorization: "Bearer " + token,},
    });
    setUserRecipes(response.data);
}   catch (error){
    console.log(error.response.data)
}
};
fetchUserRecipes();}, [token]);
return (
    <div>
    {userRecipes &&
        userRecipes.map((recipes) => (
          <p>
            {recipes.name} 
          </p>
        ))}
    </div>
    )
}

export default DisplayRecipe;
