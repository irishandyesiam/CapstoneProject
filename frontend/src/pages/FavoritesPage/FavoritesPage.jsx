import "./FavoritesPage.css";

const DisplayFavorites = (props) => {
  console.log(props);
  console.log(props.recipes);
  return (
    <div className="container">
      {props &&
        props.recipes.map((recipes) => <p key={recipes.id}>{recipes.recipe}</p>)}
    </div>
  );
};

export default DisplayFavorites;
