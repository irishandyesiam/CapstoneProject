import React from "react";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";


import axios from "axios";

const ShoppingList = () => {
  const [user, token] = useAuth();
  const [recipes, setRecipes] = useState([]);
  console.log(user)
  console.log(token)

  useEffect(() => {
    const fetchIngredients = async () => {
      try {
        let response = await axios.get("http://127.0.0.1:8000/api/shopping_list/", {
          headers: {
            Authorization: "Bearer " + token,
          },
        });
        setRecipes(response.data);
      } catch (error) {
        console.log(error.response.data);
      }
    };
    fetchIngredients();
  }, [token]);
  return (
    <div className="container">
      <h1>Shopping list for {user.username}!</h1>
      {/* input form for adding items to shopping list */}
      {recipes &&
        recipes.map((recipes) => (
          <p key={recipes.id}>
            {recipes.items} {/*buttton onclick to delete item*/}
          </p>
        ))}
    </div>
  );
};

export default ShoppingList;