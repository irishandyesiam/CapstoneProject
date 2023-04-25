import React, {useState} from 'react';
import './SearchBar.css';
import { useNavigate } from 'react-router-dom';

const SearchBar = (props) => {

    let navigate = useNavigate();

    const [ingredient_term, setIngredientTerm] = useState('');

    function handleIngredientSubmit(event) {
        event.preventDefault();
        props.submittedIngredientTerm(ingredient_term)
        navigate("/inspire")
        setIngredientTerm('');
    }


    return (
        <div className="container">
        <form className='searchbar' onSubmit={handleIngredientSubmit}>
                <input type='text' value={ingredient_term} placeholder="...enter ingredient or dish" onChange={(event) => setIngredientTerm(event.target.value)} />
                <button type='submit' value="Search">Search</button>
            </form></div>
    );
}
 
export default SearchBar;