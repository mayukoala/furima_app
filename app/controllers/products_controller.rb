class ProductsController < ApplicationController
  def index
    @parents = Category.where(ancestry: nil)
  end

  def new
    @product = Product.new
    @product.build_brand
    @product.product_images.new
    @product.build_shipping
    # データベースから親カテゴリーのみ抽出し、配列化
    @category_parent = Category.where(ancestry: nil)
  end

  def show
    @product = Product.find(params[:id])
    @user = @product.user
    @category_id = @product.category_id
    @category_parent = Category.find(@category_id)
    @category_child = Category.find(@category_id).children
    @category_grandchild = Category.find(@category_id).indirects
    @brand = @product.brand
    @images = @product.product_images.drop(1)
    @parents = Category.where(ancestry: nil)
  end

  def edit
    @product = Product.find(params[:id])
    @parents = Category.where(ancestry: nil)
    @images = @product.product_images
    @product.product_images.new
  end

  def update
    @product = Product.find(params[:id])
    @images = @product.product_images
    #binding.pry
    if @product.update(product_params)
      redirect_to root_path, notice: '更新しました'
    else
      @parents = Category.where(ancestry: nil)
      render :edit
    end
  end
  

  def create
    @category_parent = Category.where(ancestry: nil)
    @product = Product.new(product_params)
    if @product.save
      flash[:alert] = '出品が完了しました'
      redirect_to root_path 
   
    else
      flash[:alert] = '出品に失敗しました'
      @product.product_images.new
      render :new
    end 
  end
  
  private
    def product_params
      params.require(:product).permit(:name, :text, :condition, :price, :trading_status, :category_id, product_images_attributes: [:image_url, :_destroy, :id, :product_id],
      shipping_attributes: [:area, :fee, :handing_time, :shipping_type],
      brand_attributes: [:name]).merge(user_id: current_user.id)
    end
  end
