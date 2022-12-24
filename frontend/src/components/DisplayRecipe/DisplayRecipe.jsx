import React, { useEffect, useState } from 'react';
import useAuth from '../../hooks/useAuth';
import axios from 'axios';

const DisplayRecipe = (props) => {
console.log(props)
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

console.log(userRecipes)
return (
    <div>
    {userRecipes &&
        userRecipes.map((recipes) => (
          <p>
            {recipes.name} 
            <img src={recipes.image} alt={"unavailable"}/>
          </p>
          
        ))}
    </div>
    )
}

export default DisplayRecipe;
