import React from "react";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import AddItem from "../../components/AddItem/AddItem";


import axios from "axios";

const ShoppingList = () => {
  const [user, token] = useAuth();
  const [recipes, setRecipes] = useState([]);
  const [lists, setLists] = useState([]);
 
  console.log(user)
  console.log(token)
  console.log(recipes)
  

  useEffect(() => {
    fetchIngredients();
  }, [lists]);
  
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
    
  

    async function addNewItem(newItem) {
      try {
        let response = await axios.post("http://127.0.0.1:8000/api/shopping_list/", newItem, {
          headers: {
            Authorization: "Bearer " + token,
          }
        });
          setLists(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    

    async function handleDelete(el) {
      console.log(el)
      let json_id = (el.id);
     
      let response = await axios.delete(`http://127.0.0.1:8000/api/shopping_list/edit_item/${json_id}/`, 
      {
        headers: {
          Authorization: "Bearer " + token,
        }})
        console.log(response.status);
        fetchIngredients();
    }

  return (
<div className="container">
  <h1>Shopping list for {user.username}!</h1>
  <AddItem addNewItem={addNewItem}/>
  <table className="shopping-list-table">
    <thead>
      <tr>
        <th>Item</th>
        <th>Quantity</th>
        <th>Unit</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      {recipes && recipes.map((el) => (
        <tr key={el.id}>
          <td>{el.items}</td>
          <td>{el.quantity}</td>
          <td>{el.unit}</td>
          <td><button type='button' onClick={() => handleDelete(el)}>Remove</button></td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

  );
};

export default ShoppingList;