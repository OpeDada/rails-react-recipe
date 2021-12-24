import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams, useNavigate } from "react-router-dom";
import RecipeForm from "./RecipeForm";

const Recipe = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(undefined);
  const navigate = useNavigate();

  useEffect(() => {
    const url = `/api/v1/recipes/${id}`;
    axios
      .get(url)
      .then((res) => {
        setRecipe(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  if (recipe === undefined) {
    return <div>loading....</div>;
  }
  function addHtmlEntities(str) {
    return String(str).replace(/&lt;/g, "<").replace(/&gt;/g, ">");
  }

  let ingredientList = "No ingredients available";

  if (recipe.ingredients.length > 0) {
    ingredientList = recipe.ingredients.split(",").map((ingredient, index) => (
      <li key={index} className="list-group-item">
        {ingredient}
      </li>
    ));
  }

  function deleteRecipe() {
    const url = `/api/v1/recipes/${id}`;
    const token = document.querySelector('meta[name="csrf-token"]').content;

    fetch(url, {
      method: "DELETE",
      headers: {
        "X-CSRF-Token": token,
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then((response) => {
        navigate("/recipes");
      })
      .catch((error) => console.log(error.message));
  }

  return (
    <div className="">
      <div className="hero position-relative d-flex align-items-center justify-content-center">
        <img
          src={recipe.image}
          alt={`${recipe.name} image`}
          className="img-fluid position-absolute"
        />
        <div className="overlay bg-dark position-absolute" />
        <h1 className="display-4 position-relative text-white">
          {recipe.name}
        </h1>
      </div>
      <div className="container py-5">
        <div className="row">
          <div className="col-sm-12 col-lg-3">
            <ul className="list-group">
              <h5 className="mb-2">Ingredients</h5>
              {ingredientList}
            </ul>
          </div>
          <div className="col-sm-12 col-lg-7">
            <h5 className="mb-2">Preparation Instructions</h5>
            <div
              dangerouslySetInnerHTML={{
                __html: `${addHtmlEntities(recipe.instruction)}`,
              }}
            />
          </div>
          <div className="col-sm-12 col-lg-2">
            <button
              type="button"
              className="btn btn-danger"
              onClick={deleteRecipe}
            >
              Delete Recipe
            </button>
          </div>
          <div className="col-sm-12 col-lg-2">
            {/* <Link
              to={`/recipes/${recipe.id}/edit`}
              className="btn custom-button ml-2"
            >
              Edit Recipe
            </Link> */}
          </div>
        </div>
        <Link to="/recipes" className="btn btn-link">
          Back to recipes
        </Link>
      </div>
    </div>
  );
};

export default Recipe;
