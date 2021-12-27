import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../components/Home";
import Recipes from "../components/recipes/Recipes";
import Recipe from "../components/recipes/Recipe";
import NewRecipe from "../components/recipes/NewRecipe";
import EditRecipe from "../components/recipes/EditRecipe";

export default (
  <Router>
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route exact path="/recipes" element={<Recipes />} />
      <Route exact path="/recipe" element={<NewRecipe />} />
      <Route exact path="/recipe/:id" element={<Recipe />} />
      <Route path="/recipes/:id/edit" element={<EditRecipe />} />
    </Routes>
  </Router>
);
