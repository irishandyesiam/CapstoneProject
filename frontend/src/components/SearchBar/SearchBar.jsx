import React, {useState} from 'react';
import './SearchBar.css';
import { useNavigate } from 'react-router-dom';

const SearchBar = (props) => {

    let navigate = useNavigate();

    const [search_term, setSearchTerm] = useState('');
    const [ingredient_term, setIngredientTerm] = useState('');

    function handleIngredientSubmit(event) {
        event.preventDefault();
        props.submittedIngredientTerm(ingredient_term)
        navigate("/inspire")
    }

    function handleDishSubmit(event) {
        event.preventDefault();
        console.log("The submitted search term is", search_term)
        props.submittedSearchTerm(search_term)
        navigate("/search_results_display")
    };

    return (
        <><form className='searchbar' onSubmit={handleDishSubmit}>
            <input type='text' value={search_term} placeholder="...search by dish" onChange={(event) => setSearchTerm(event.target.value)} />
            <button type='submit' value="Search">Dish Search</button>
        </form><form className='searchbar' onSubmit={handleIngredientSubmit}>
                <input type='text' value={ingredient_term} placeholder="...search by ingredient" onChange={(event) => setIngredientTerm(event.target.value)} />
                <button type='submit' value="Search">Ingredient Search</button>
            </form></>
    );
}
 
export default SearchBar;