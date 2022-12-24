import React from "react";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";


import axios from "axios";

const HomePage = () => {
  // The "user" value from this Hook contains the decoded logged in user information (username, first name, id)
  // The "token" value is the JWT token that you will send in the header of any request requiring authentication
  //TODO: Add an AddCars Page to add a car for a logged in user's garage
  const [user, token] = useAuth();
  const [recipes, setRecipes] = useState([]);
  console.log(user)
  console.log(token)

  useEffect(() => {
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
      <h1>Welcome {user.username} to... </h1><br></br>
      <h1>How do I use this food? </h1><br></br>
      <h2>Recipe-generator-o-matic ... 5000! </h2>
      {recipes &&
        recipes.map((recipes) => (
          <p key={recipes.id} >
            {recipes.name} 
          </p>
        ))}
    </div>
  );
};

export default HomePage;
