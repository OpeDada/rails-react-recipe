import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const NewRecipe = ({ id }) => {
  const [curRecipe, setCurRecipe] = useState({
    name: "",
    ingredients: "",
    instruction: "",
  });
  const navigate = useNavigate();

  function addHtmlEntities(str) {
    return String(str).replace(/<br>\ <br>/g, "\n");
  }

  useEffect(() => {
    if (id) {
      const url = `/api/v1/recipes/${id}`;
      axios
        .get(url)
        .then((res) => {
          let resData = res.data;
          resData.instruction = addHtmlEntities(res.data.instruction);
          setCurRecipe(resData);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);

  const onChange = (event) => {
    curRecipe[event.target.name] = event.target.value;
    setCurRecipe(curRecipe);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    let url = "/api/v1/recipes";

    if (
      curRecipe.name.length == 0 ||
      curRecipe.ingredients.length == 0 ||
      curRecipe.instruction.length == 0
    )
      return;

    const body = {
      name: curRecipe.name,
      ingredients: curRecipe.ingredients,
      instruction: curRecipe.instruction.replace(/\n/g, "<br> <br>"),
    };

    const token = document.querySelector('meta[name="csrf-token"]').content;
    let postData = "POST";
    if (id) {
      postData = "PATCH";
      url = `/api/v1/recipes/${id}`;
    }
    fetch(url, {
      method: postData,
      headers: {
        "X-CSRF-Token": token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then((response) => {
        navigate(`/recipe/${response.id}`);
      })
      .catch((error) => console.log(error.message));
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-sm-12 col-lg-6 offset-lg-3">
          <h1 className="font-weight-normal mb-5">
            Add a new recipe to our awesome recipe collection.
          </h1>
          <form onSubmit={onSubmit}>
            <div className="form-group">
              <label htmlFor="recipeName">Recipe name</label>
              <input
                type="text"
                name="name"
                id="recipeName"
                className="form-control"
                defaultValue={curRecipe.name}
                required
                onChange={onChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="recipeIngredients">Ingredients</label>
              <input
                type="text"
                name="ingredients"
                id="recipeIngredients"
                className="form-control"
                defaultValue={curRecipe.ingredients}
                required
                onChange={onChange}
              />
              <small id="ingredientsHelp" className="form-text text-muted">
                Separate each ingredient with a comma.
              </small>
            </div>
            <label htmlFor="instruction">Preparation Instructions</label>
            <textarea
              className="form-control"
              id="instruction"
              name="instruction"
              defaultValue={curRecipe.instruction}
              rows="5"
              required
              onChange={onChange}
            />
            {id ? (
              <button type="submit" className="btn custom-button mt-3">
                Update Recipe
              </button>
            ) : (
              <button type="submit" className="btn custom-button mt-3">
                Create Recipe
              </button>
            )}
            <Link to="/recipes" className="btn btn-link mt-3">
              Back to recipes
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewRecipe;
