
import './SearchResultsDisplay.css'
import { useNavigate } from 'react-router-dom';

const SearchResultsDisplay = (props) => {
  console.log(props.dish_search);
 
 
  let navigate = useNavigate();



  function handleDishOnClick(recipe) {
    console.log(recipe)
    props.passedDishRecipe(recipe)
    navigate('/display_recipe')
  }



  return (
    <div class="img-gallery">
      {props.dish_search.map((el, index) => {
        return (
          <div className="img-box">
            <img className="img" key={index} src={el.image} alt={"unavailable"} onClick={() => handleDishOnClick(el)} />
            <h3 className="name">{el.name}</h3>
          </div>
        )
      })}
      </div>
  )
}

export default SearchResultsDisplay;
