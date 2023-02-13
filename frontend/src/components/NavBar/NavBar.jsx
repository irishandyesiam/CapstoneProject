import React from "react";
import { useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import "./NavBar.css";

const Navbar = () => {
  const { logoutUser, user } = useContext(AuthContext);
  const navigate = useNavigate();
  return (
    <div className="navBar">
      <ul>
        <li className="brand">
          <Link to="/" style={{ textDecoration: "none"}}>
            <b>Reci-Matic</b>
          </Link>
        </li>
        <Link to="meal_planner/" style={{ textDecoration: "none"}}>My Meal Plan</Link>
        <Link to="shopping_list/" style={{ textDecoration: "none"}}>My Shopping List</Link>
        <Link to="favorites/" style={{ textDecoration: "none"}}>Favorites</Link>
        <li>
          {user ? (
            <button onClick={logoutUser}>Logout</button>
          ) : (
            <button onClick={() => navigate("/login")}>Login</button>
          )}
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
