class HomeController < ApplicationController
  def index
    @images = ProductImage.order("created_at DESC").limit(5)
    @products = Product.order("created_at DESC").limit(5)
    @parents = Category.where(ancestry: nil)
  end
end