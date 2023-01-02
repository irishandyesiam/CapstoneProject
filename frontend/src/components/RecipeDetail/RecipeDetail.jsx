import { useEffect, useState } from "react";
import useAuth from '../../hooks/useAuth';
import axios from 'axios';

const RecipeDetail = (props) => {
    const [user, token] = useAuth();
    const [recipeDetails, setRecipeDetails] = useState();

useEffect(() => {
    const fetchUserRecipeDetails = async () => {
        try {
            let response = await axios.get("http://127.0.0.1:8000/api/recipes/1/", {
                headers: {
                    Authorization: "Bearer " + token,},
                });
                setRecipeDetails(response.data);
            } catch (error){
                console.log(error.respose.data)
            }
            };
            fetchUserRecipeDetails();}, [token]);
console.log(recipeDetails)
return (
    <div>
        {recipeDetails && 
        <div>
            <p>{recipeDetails.ingredients}</p><br></br>
            <p>{recipeDetails.instructions}</p><br></br>
        </div>
        }
    </div>
    )
}

export default RecipeDetail;