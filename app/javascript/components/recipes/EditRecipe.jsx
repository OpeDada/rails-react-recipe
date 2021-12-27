import React from "react";
import { useParams } from "react-router-dom";
import RecipeForm from "./RecipeForm";

const NewRecipe = () => {
  const { id } = useParams();

  return <RecipeForm id={id} />;
};

export default NewRecipe;
