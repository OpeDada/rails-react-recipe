class Api::V1::RecipesController < ApplicationController
  before_action :set_recipe, only: %i[show update destroy]

  def index
    @recipes = Recipe.all.order(created_at: :desc)
    render json: @recipes
  end

  def show
    render json: @recipe
  end

  def create
    @recipe = Recipe.new(recipe_params)

    if @recipe.save
      render json: @recipe, status: :created
    else
      render json: @recipe.errors, status: :unprocessable_entity
    end
  end

  def update
    if @recipe.update(recipe_params)
      render json: @recipe, status: :ok
    else
      render json: @recipe.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @recipe&.destroy # Ruby's safe navigation operator &. avoids nil errors when calling a method.
    render json: { message: 'Recipe deleted!' }
  end

  private

  def set_recipe
    @recipe = Recipe.find(params[:id])
  end

  def recipe_params
    params.require(:recipe).permit(:name, :ingredients, :instruction, :photo)
  end
end
