class Api::V1::RecipesController < ApplicationController
  def index
    @recipes = Recipe.all.order(created_at: :desc)
    render json: @recipes
  end

  def show
    @recipe = Recipe.find(params[:id])
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
    @recipe = Recipe.find(params[:id])
    if @recipe.update(recipe_params)
      render json: @recipe
    else
      render json: @recipe.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @recipe = Recipe.find(params[:id])
    @recipe&.destroy # Ruby's safe navigation operator &. avoids nil errors when calling a method.
    render json: { message: 'Recipe deleted!' }
  end

  private

  # def set_recipe
  #   @recipe = Recipe.find(params[:id])
  # end

  def recipe_params
    params.require(:recipe).permit(:name, :ingredients, :instruction, :photo)
  end
end
