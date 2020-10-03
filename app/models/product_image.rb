class ProductImage < ApplicationRecord
  mount_uploader :image_url, ImageUploader
  belongs_to :product
  # validates :image_url, presence: true
end
