class AddImageToRecipes < ActiveRecord::Migration[6.0]
  def change
    add_column :recipes, :image, :string, default: 'https://raw.githubusercontent.com/OpeDada/rails-react-recipe/master/app/assets/images/recipe.jpg'
  end
end
