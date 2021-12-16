import React, { useState, useEffect } from "react";
import axios from "axios";

const Recipes = (props) => {
  useEffect(() => {
    axios.get("api/v1/recipes.json").then((res) => setRecipes(res.data));
  }, []);

  const [recipes, setRecipes] = useState([]);

  return (
    <div>
      <div className="recipes-list">
        {recipes.map((recipe, index) => (
          <div key={index}>
            {recipe.name}
            {recipe.ingredients}
            {recipe.instruction}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Recipes;
