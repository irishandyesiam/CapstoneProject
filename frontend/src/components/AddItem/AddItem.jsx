import React from "react";
import { useContext, useState } from "react";
import AuthContext from "../../context/AuthContext";



const AddItem = (props) => {



const [item, setItem] = useState([]);


  function handleSubmit(event) {
    event.preventDefault();
    const newItem = {
        items: item,
    };
    props.addNewItem(newItem)

  }

return (
    <div>
    <form onSubmit={handleSubmit} className='addIngredient'>
      <input type='text' value={item} placeholder="Add Ingredient" onChange={(event) => setItem(event.target.value)}/>
      <button type='submit'>Add To List</button>
    </form>
    </div>
)
}
export default AddItem;