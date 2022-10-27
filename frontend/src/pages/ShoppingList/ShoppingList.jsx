import React from "react";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import AddItem from "../../components/AddItem/AddItem";


import axios from "axios";

const ShoppingList = () => {
  const [user, token] = useAuth();
  const [recipes, setRecipes] = useState([]);
  const [key] = useState([]);
 
  console.log(user)
  console.log(token)
  console.log(recipes)
  

  useEffect(() => {
    fetchIngredients();
  }, [token]);
  
    const fetchIngredients = async () => {
      try {
        let response = await axios.get("http://127.0.0.1:8000/api/shopping_list/", {
          headers: {
            Authorization: "Bearer " + token,
          },
        });
        setRecipes(response.data);
      } catch (error) {
        console.log(error.response);
      }
    };
    
  

    async function addNewItem(newItem){
      let response = await axios.post("http://127.0.0.1:8000/api/shopping_list/", newItem,  {headers: {
          Authorization: "Bearer " + token,
        }})
      if(response.status === 201){
          await fetchIngredients();
      }
  }

    async function handleDelete(el) {
      console.log(el.id)
      let json_id = (el.id);
      let response = await axios.delete(`http://127.0.0.1:8000/api/shopping_list/edit_item/${json_id}/`,
      {
        headers: {
          Authorization: "Bearer " + token,
        }})
        console.log(response.status)
     
    }
  return (
    <div className="container">
      <h1>Shopping list for {user.username}!</h1>
      <AddItem addNewItem={addNewItem}/>
      {recipes &&
        recipes.map((el) => (
          <p key={el.id}>
            {el.items} <button type='delete' onClick={() => handleDelete(el)}>Delete</button>
          </p>
        ))}
    </div>
  );
};

export default ShoppingList;