
import { useNavigate } from "react-router-dom";
import './InspirePage.css';

const InspirePageDisplay = (props) => {

    console.log(props.ingredient_search);
  
    
    let navigate = useNavigate();

    function idNumberOnClick(ingredient_recipee) {
      let ing_recipe_id = ingredient_recipee.id;
      console.log(ing_recipe_id);
      props.passedIdNumber(ing_recipe_id);
    }

    function handleIngredientOnClick(ingredient_recipe) {
        props.passedIngredientRecipe(ingredient_recipe)
        navigate('/inspire_display')
        console.log(ingredient_recipe)
        idNumberOnClick(ingredient_recipe);
      }

return (

    <div class="img-gallery">
        {props.ingredient_search.map((el, index) => {
          return (
            <div className="img-box">
              <img className="img" key={index} src={el.thumbnail_url} alt={"unavailable"} onClick={() => handleIngredientOnClick(el)} />
              <h3 className="name">{el.name}</h3><br></br>
             
            </div>
          );
        })}
      </div>
  );

};

export default InspirePageDisplay;