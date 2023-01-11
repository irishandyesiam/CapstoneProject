import React, { useEffect, useState } from 'react';
import useAuth from '../../hooks/useAuth';
import axios from 'axios';

const DisplayRecipeBook = (props) => {
    const [user, token] = useAuth();
    const [userRecipes, setUserRecipes] = useState([]);
    const [toggle, setToggle] = useState(true);

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

const handleClick = () => {
    setToggle(!toggle);
};

console.log(userRecipes)
return (
    <div>
    {userRecipes &&
        userRecipes.map((recipes) => (
          <p>
            {recipes.name} 
            <div>
            <button 
            onClick={handleClick} 
            class="btn btn-info mb-5">
            {toggle ? "Less" : "More"}
            </button>

            {toggle ?
                <ul class="list-group">
                <li class="list-group-item">{recipes.ingredients}</li>
                <li class="list-group-item">{recipes.instructions}</li>
                </ul>
                :
                <></>
            }
            </div>
          </p>
          
        ))}
    </div>
    )
}

export default DisplayRecipeBook;
