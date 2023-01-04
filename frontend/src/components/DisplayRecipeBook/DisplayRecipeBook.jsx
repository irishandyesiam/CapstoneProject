import React, { useEffect, useState } from 'react';
import useAuth from '../../hooks/useAuth';
import axios from 'axios';

const DisplayRecipeBook = (props) => {
console.log(props)
    const [user, token] = useAuth();
    const [userRecipes, setUserRecipes] = useState([]);
    const [showFullRecipe, setShowFullRecipe] = useState([false]);

useEffect(() => {
    const fetchUserRecipes = async () => {
        try {  
            let response = await axios.get("http://127.0.0.1:8000/api/recipes/recipe-detail/", {
            headers: {
              Authorization: "Bearer " + token,},
    });
    setUserRecipes(response.data);
}   catch (error){
    console.log(error.response.data)
}
};
fetchUserRecipes();}, [token]);

function filterPerId(selected) {
    console.log("Should print when clicked", selected.name)
}

console.log(userRecipes)
return (
    <div>
    {userRecipes &&
        userRecipes.map((recipes) => (
          <p>
            {recipes.name} 
            <button className="btn" onClick={()=> filterPerId(recipes)}>more</button>
            
            {/* <img src={recipes.image} alt={"unavailable"}/> */}
            {/* {showFullRecipe ? recipes : `${recipes.ingredients}`}
            <button className="btn" onClick={() => setShowFullRecipe(!showFullRecipe)}>{showFullRecipe ? "More" : "Less"}</button> */}
          </p>
          
        ))}
    </div>
    )
}

export default DisplayRecipeBook;
