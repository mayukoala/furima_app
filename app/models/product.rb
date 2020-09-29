class Product < ApplicationRecord
  belongs_to :user
  belongs_to :category
  belongs_to :brand, optional: true
  belongs_to :shipping
  has_one :order
  has_many :product_images, dependent: :destroy
  accepts_nested_attributes_for :shipping
  accepts_nested_attributes_for :brand, allow_destroy: true,update_only: true
  accepts_nested_attributes_for :product_images, allow_destroy: true
  validates :name, :text, :price, :product_images, presence: true
  validates_associated :product_images
  
end
