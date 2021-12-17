import React, { useState } from "react";

const NewRecipe = (props) => {
  const [recipe, setRecipe] = useState(props.initialFormState);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setRecipe({ ...recipe, [name]: value });
  };

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        if (!recipe.name || !recipe.ingredients || !recipe.instruction) return;
        props.addRecipe(recipe);
        setRecipe(props.initialFormState);
      }}
    >
      <label>Recipe</label>
      <input
        type="text"
        name="name"
        value={recipe.name}
        onChange={handleInputChange}
      ></input>
      <label>Ingredients</label>
      <input
        type="text"
        name="ingredients"
        value={recipe.ingredients}
        onChange={handleInputChange}
      ></input>
      <label>Instruction</label>
      <input
        type="text"
        name="instruction"
        value={recipe.instruction}
        onChange={handleInputChange}
      ></input>
      <button>Create Recipe</button>
    </form>
  );
};

export default NewRecipe;
