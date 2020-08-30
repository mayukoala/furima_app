class ProductsController < ApplicationController
  def index
  end

  def new
    # データベースから親カテゴリーのみ抽出し、配列化
    @category_parent = Category.where(ancestry: nil)
  end

  def show
    @product = Product.find(params[:id])
    @category_id = @product.category_id
    @category_parent = Category.find(@category_id)
    @category_child = Category.find(@category_id).children
    @category_grandchild = Category.find(@category_id).indirects
  end

  # 親カテゴリーが選択された後に動くアクション
  def get_category_children
    @category_children = Category.find(params[:parent_id]).children
  end

  # 子カテゴリーが選択された後に動くアクション
  def get_category_grandchildren
    @category_grandchildren = Category.find(params[:child_id]).children
  end

  def create
    @product = Product.create(product_params)
  end

  private
  def product_params
  end
end
