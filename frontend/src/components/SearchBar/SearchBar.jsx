import React, {useState} from 'react';
import './SearchBar.css';

const SearchBar = (props) => {

    const [search_term, setSearchTerm] = useState('');

    function handleSubmit(event) {
        event.preventDefault();
        console.log("The submitted search term is", search_term)
        props.submittedSearchTerm(search_term)
    };

    return (
        <form className='searchbar' onSubmit={handleSubmit}>
            <input type='text' value={search_term} placeholder="...search" onChange={(event) => setSearchTerm(event.target.value)}/>
            <button type='submit' value="Search">Search</button>
        </form>
    );
}
 
export default SearchBar;