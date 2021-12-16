class Recipe < ApplicationRecord
  has_one_attached :photo

  validates :name, presence: true
  validates :ingredients, presence: true
  validates :instruction, presence: true
end
