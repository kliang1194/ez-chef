import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Outlet,
  useLocation,
  Navigate,
} from "react-router-dom";
import Index from "./Index";
import Nav from "./Nav";
import MyRecipes from "./MyRecipes";
import Favourites from "./Favourites";
import GroceryList from "./GroceryList";
import Register from "./Register";
import Login from "./Login";
import SearchForm from "./SearchForm";
import RecipeDetails from "./RecipeDetails";
import "./App.css";
import NewRecipe from "./NewRecipe";

const AuthenticateUser = () => {
  let authenticatedUser = localStorage.getItem("storedUser");
  let location = useLocation();
  if (!authenticatedUser) {
    return <Navigate to="/login" state={{ from: location }} />;
  }
  return <Outlet />;
};

const App = () => {
  return (
    <BrowserRouter>
      <div className="App">
        <Nav />
        <div className="main">
          <Routes>
            <Route path="/" element={<Index />}></Route>

            <Route path="/register" element={<Register />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/search" element={<SearchForm />}></Route>
            <Route
              path="/search/id/:recipeID"
              element={<RecipeDetails />}
            ></Route>
            <Route element={<AuthenticateUser />}>
              <Route path="/myrecipes" element={<MyRecipes />}></Route>
              <Route path="/new" element={<NewRecipe />}></Route>
              <Route path="/favourites" element={<Favourites />}></Route>
              <Route path="/grocerylist" element={<GroceryList />}></Route>
            </Route>
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
