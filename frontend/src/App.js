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

// Component Imports
import Navbar from "./components/NavBar/NavBar";
import Footer from "./components/Footer/Footer";
import SearchBar from "./components/SearchBar/SearchBar";
import SearchResultsDisplay from "./pages/SearchResultsDisplay/SearchResultsDisplay";

// Util Imports
import PrivateRoute from "./utils/PrivateRoute";
import { useEffect, useState } from "react";

function App() {

  const [recipes, setRecipes] = useState([]);
  const [passed_recipe, setPassedRecipe] = useState([]);
  const [ingredient_search, setIngredientSearch] = useState([]);

  useEffect(() => {
    getSuggestedRecipes();
  }, [])

  async function getSuggestedRecipes(){
    try{
    let response = await axios.get(`https://recipesapi2.p.rapidapi.com/recipes/tomato%20soup`,{

    headers: {
      'X-RapidAPI-Key': '07710484e3msh42b10869d913fd2p1180a4jsn6142c9c0fe21',
      'X-RapidAPI-Host': 'recipesapi2.p.rapidapi.com'
    }
    });
    setRecipes(response.data.data);
    } catch(ex){
    console.log(`ERROR in getSuggestedRecipes EXCEPTION: ${ex}`);
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
        console.log(response.data)
        setIngredientSearch(response.data);
    } catch(error){
      console.log(`ERROR in submittedSearchTerm EXCEPTION: ${error}`);
    }
  }

  async function submittedSearchTerm(search_term){
    console.log("Passed dish", search_term)
    try{
      let response = await axios.get(`https://recipesapi2.p.rapidapi.com/recipes/${search_term}/`,{
        headers: {
          'X-RapidAPI-Key': '07710484e3msh42b10869d913fd2p1180a4jsn6142c9c0fe21',
          'X-RapidAPI-Host': 'recipesapi2.p.rapidapi.com'
        }
        });
        setRecipes(response.data.data);
    } catch(error){
      console.log(`ERROR in submittedSearchTerm EXCEPTION: ${error}`);
    }
  };

  function passedRecipe(recipe){
    console.log("FUNCTION IN APP.JS THAT RECIEVES RECIPE: ", recipe)
    let response = recipe
    setPassedRecipe(response)
  };

  
  return (
    <div>
      <Navbar />
      <SearchBar submittedSearchTerm={submittedSearchTerm} submittedIngredientTerm={submittedIngredientTerm}/>
      
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
        <Route path="/display_recipe" element={<PrivateRoute><RecipeDisplayPage passed_recipe={passed_recipe}/></PrivateRoute>} />
        <Route path="/search_results_display" element={<SearchResultsDisplay passedRecipe={passedRecipe} recipes={recipes} ingredient_search={ingredient_search}/>} />
        <Route path="/meal_planner" element={<PrivateRoute><MealPlan /></PrivateRoute>} />
        <Route path="/shopping_list" element={<PrivateRoute><ShoppingList /></PrivateRoute>} />
      </Routes>
      {/* <Footer /> */}
    </div>
  );
}

export default App;
