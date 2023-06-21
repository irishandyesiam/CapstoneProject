
import { useNavigate } from "react-router-dom";
import './InspirePage.css';

const InspirePageDisplay = (props) => {  
    let navigate = useNavigate();

    function idNumberOnClick(ingredient_recipee) {
      let ing_recipe_id = ingredient_recipee.id;
      props.passedIdNumber(ing_recipe_id);
    }

    function handleIngredientOnClick(ingredient_recipe) {
        props.passedIngredientRecipe(ingredient_recipe)
        navigate('/inspire_display')
        idNumberOnClick(ingredient_recipe);
      }

return (

    <div className="img-gallery">
        {props.ingredient_search.map((el, index) => {
          return (
            <div className="img-box">
              <img className="img" key={el.id} src={el.thumbnail_url} alt={"unavailable"} onClick={() => handleIngredientOnClick(el)} />
              <h3 className="name" key={el.index}>{el.name}</h3><br></br>
             
            </div>
          );
        })}
      </div>
  );

};

export default InspirePageDisplay;