import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../components/Home";
import Recipes from "../components/Recipes";
import Recipe from "../components/Recipe";
// import NewRecipe from "../components/NewRecipe";
import NewRecipe from "../components/NewRecipeFunctional";

export default (
  <Router>
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route exact path="/recipes" element={<Recipes />} />
      <Route exact path="/recipe/:id" element={<Recipe />} />
      <Route exact path="/recipe" element={<NewRecipe />} />
    </Routes>
  </Router>
);
