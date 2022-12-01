// General Imports
import { Routes, Route } from "react-router-dom";
import "./App.css";
import axios from "axios";

// Pages Imports
import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import RecipeDisplayPage from "./pages/RecipeDisplayPage/RecipeDisplayPage";
import MealPlan from "./pages/MealPlanPage/MealPlan";
import ShoppingList from "./pages/ShoppingList/ShoppingList";
import InspirePage from "./pages/InspirePage/InspirePage";
import IngredientRecipePage from "./pages/IngredientRecipeDisplay/IngredientRecipePage";
import FavoritesPage from "./pages/FavoritesPage/FavoritesPage";
import FavoriteRecipeDisplay from "./pages/FavoriteRecipeDisplay/FavoriteRecipeDisplay";

// Component Imports
import Navbar from "./components/NavBar/NavBar";
import Footer from "./components/Footer/Footer";
import SearchBar from "./components/SearchBar/SearchBar";
import SearchResultsDisplay from "./pages/SearchResultsDisplay/SearchResultsDisplay";

// Util Imports
import PrivateRoute from "./utils/PrivateRoute";
import { useEffect, useState } from "react";
import useAuth from "./hooks/useAuth";

function App() {

  const [recipes, setRecipes] = useState([]);
  // const [favorite_id, setFavoriteId] = useState([]);
  const [favorite_recipe, setFavoriteRecipe] = useState([])
  const [dish_search, setDishes] = useState ([]);
  const [passed_dish_recipe, setPassedDishRecipe] = useState([]);
  const [ingredient_search, setIngredientSearch] = useState([]);
  const [passed_ing_recipe, setPassedIngredientRecipe] = useState([]);
  const [passed_ing_id, setPassedIngredientsId] = useState([]);
  const [user, token] = useAuth();


  useEffect(() => {
    getFavoriteRecipes();
    passedFavoriteId();
  }, [])

  async function getFavoriteRecipes(){
    try{
    let response = await axios.get(`http://127.0.0.1:8000/api/favorite_recipe/`,{
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    setRecipes(response.data);
    console.log(response.data)
    } catch(ex){
    console.log(`ERROR in getFavoriteRecipes EXCEPTION: ${ex}`);
    }
  }

  async function passedFavoriteId(fav_recipe){
    console.log(fav_recipe.id)
    try{
    let response = await axios.get(`http://127.0.0.1:8000/api/favorite_recipe/${fav_recipe.id}/`,{
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    setFavoriteRecipe(response.data);
    console.log(response.data)
    } catch(ex){
    console.log(`ERROR in passedFavoriteId EXCEPTION: ${ex}`);
    }
  }

  async function submittedIngredientTerm(search_term){
    console.log("Passed ingredient", search_term)
    try{
      let response = await axios.get(`https://tasty.p.rapidapi.com/recipes/list`,{
      params: {from: '0', size: '5', q: `${search_term}`},
      headers: {
        'X-RapidAPI-Key': '07710484e3msh42b10869d913fd2p1180a4jsn6142c9c0fe21',
        'X-RapidAPI-Host': 'tasty.p.rapidapi.com'
      }
        });
        console.log(response.data.results)
        setIngredientSearch(response.data.results);
    } catch(error){
      console.log(`ERROR in submittedSearchTerm EXCEPTION: ${error}`);
    }
  }

  async function passedIdNumber(id_number) {
    console.log("Hopefully right", id_number);
    let recipe_id = id_number;
    try{
        let response = await axios.get(`https://tasty.p.rapidapi.com/recipes/get-more-info`,{
        params: {id: `${recipe_id}`},
        headers: {
          'X-RapidAPI-Key': '07710484e3msh42b10869d913fd2p1180a4jsn6142c9c0fe21',
          'X-RapidAPI-Host': 'tasty.p.rapidapi.com'
        }
          });
          console.log(response.data)
          setPassedIngredientsId(response.data);
      } catch(error){
        console.log(`ERROR in submittedSearchTerm EXCEPTION: ${error}`);
      }
    };
  
  async function submittedSearchTerm(search_term){
    console.log("Passed dish", search_term)
    try{
      let response = await axios.get(`https://recipesapi2.p.rapidapi.com/recipes/${search_term}/`,{
        params: {maxRecipes: '5'},
        headers: {
          'X-RapidAPI-Key': '07710484e3msh42b10869d913fd2p1180a4jsn6142c9c0fe21',
          'X-RapidAPI-Host': 'recipesapi2.p.rapidapi.com'
        }
        });
        setDishes(response.data.data);
    } catch(error){
      console.log(`ERROR in submittedSearchTerm EXCEPTION: ${error}`);
    }
  };

  function passedDishRecipe(recipe){
    console.log("FUNCTION IN APP.JS THAT RECIEVES RECIPE: ", recipe)
    let response = recipe
    setPassedDishRecipe(response)
  };

  function passedIngredientRecipe(ing_recipe){
    console.log(ing_recipe.id)
    let response = ing_recipe
    setPassedIngredientRecipe(response)
  };

  // function passedFavoriteId(fav_recipe){
  //   console.log(fav_recipe.id)
  //   let response = fav_recipe.id
  //   setFavoriteId(response)
  // };

  return (
    <div>
      <Navbar />
      <div className = "searchbar_container">
      <SearchBar submittedSearchTerm={submittedSearchTerm} submittedIngredientTerm={submittedIngredientTerm}/>
      </div>
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <HomePage />
            </PrivateRoute>
          }
        />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/display_recipe" element={<PrivateRoute><RecipeDisplayPage passed_dish_recipe={passed_dish_recipe}  /></PrivateRoute>} />
        <Route path="/inspire" element={<PrivateRoute><InspirePage passedIngredientRecipe={passedIngredientRecipe} passed_ing_recipe={passed_ing_recipe} ingredient_search={ingredient_search} passedIdNumber={passedIdNumber} /></PrivateRoute>} />
        <Route path="/search_results_display" element={<SearchResultsDisplay  passedDishRecipe={passedDishRecipe} dish_search={dish_search} ingredient_search={ingredient_search}/>} />
        <Route path="/meal_planner" element={<PrivateRoute><MealPlan /></PrivateRoute>} />
        <Route path="/shopping_list" element={<PrivateRoute><ShoppingList /></PrivateRoute>} />
        <Route path="/inspire_display" element={<PrivateRoute><IngredientRecipePage passed_ing_recipe={passed_ing_recipe} /></PrivateRoute>} />
        <Route path="/favorites" element={<PrivateRoute><FavoritesPage recipes={recipes} passedFavoriteId={passedFavoriteId}/></PrivateRoute>} />
        <Route path="/favorite_recipe_display" element={<PrivateRoute><FavoriteRecipeDisplay favorite_recipe={favorite_recipe} /></PrivateRoute>}/>
      </Routes>
      {/* <Footer /> */}
    </div>
  );
}

export default App;
