import { useEffect, useState } from "react";
import useAuth from '../../hooks/useAuth';
import axios from 'axios';

const RecipeDetail = (props) => {
    const [user, token] = useAuth();
    const [recipeDetails, setRecipeDetails] = useState();

useEffect(() => {
    const fetchUserRecipeDetails = async () => {
        try {
            let response = await axios.get()
        }
    }
})
    return (

    )
}

export default RecipeDetail;