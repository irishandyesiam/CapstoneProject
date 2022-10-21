import React, {useState} from 'react';
import './SearchBar.css';
import { useNavigate } from 'react-router-dom';

const SearchBar = (props) => {

    let navigate = useNavigate();

    const [search_term, setSearchTerm] = useState('');

    function handleSubmit(event) {
        event.preventDefault();
        console.log("The submitted search term is", search_term)
        props.submittedSearchTerm(search_term)
        navigate("/search_results_display")
    };

    return (
        <form className='searchbar' onSubmit={handleSubmit}>
            <input type='text' value={search_term} placeholder="...search by dish" onChange={(event) => setSearchTerm(event.target.value)}/>
            <button type='submit' value="Search">Search</button>
        </form>
    );
}
 
export default SearchBar;