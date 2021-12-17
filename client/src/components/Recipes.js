import React, { useState, useEffect } from "react";
import axios from "axios";
import NewRecipe from "./NewRecipe";

const initialFormState = {
  name: "",
  ingredients: "",
  instruction: "",
};

const Recipes = (props) => {
  useEffect(() => {
    axios.get("api/v1/recipes.json").then((res) => setRecipes(res.data));
  }, []);

  const [recipes, setRecipes] = useState([]);

  const addRecipe = (recipe) => {
    const qs = require("qs");
    axios
      .post(
        "/api/v1/recipes",
        qs.stringify({
          recipe: {
            name: recipe.name,
            ingredients: recipe.ingredients,
            instruction: recipe.instruction,
          },
        })
      )
      .then((res) => console.log(res))
      .catch((error) => console.log(error));

    setRecipes([...recipes, recipe]);
  };

  return (
    <div>
      <div>
        <NewRecipe addRecipe={addRecipe} initialFormState={initialFormState} />
      </div>
      <div className="recipes-list">
        {recipes.map((recipe, index) => (
          <div key={index}>
            {recipe.name}
            <img src={recipe.image} alt="Recipe pic" />
            {recipe.ingredients}
            {recipe.instruction}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Recipes;
