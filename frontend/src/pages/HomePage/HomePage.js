import React from "react";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import DisplayRecipeBook from "../../components/DisplayRecipeBook/DisplayRecipeBook";


import axios from "axios";

const HomePage = () => {
  // The "user" value from this Hook contains the decoded logged in user information (username, first name, id)
  // The "token" value is the JWT token that you will send in the header of any request requiring authentication
  //TODO: Add an AddCars Page to add a car for a logged in user's garage
  const [user, token] = useAuth();

  return (
    <div className="container">
      <h1>Welcome {user.username} to... </h1><br></br>
      <h1>How do I use this food? </h1><br></br>
      <h2>Recipe-generator-o-matic ... 5000! </h2>
      {/* <div><DisplayRecipeBook/></div> */}
    </div>
    
  );
};

export default HomePage;
