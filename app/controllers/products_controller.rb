class ProductsController < ApplicationController
  before_action :get_product, only: [:show, :destroy, :edit, :update]
  before_action :set_categories, only: [:edit, :update]
  before_action :show_all_instance, only: [:show, :edit, :destroy, :update]


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
    @user = @product.user
    @brand = @product.brand
    @images = @product.product_images.drop(1)
    @parents = Category.where(ancestry: nil)
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

  def destroy
    if @product.destroy
      redirect_to root_path
    else
      render :show
    end
  end

  def edit
    @user = @product.user
    @brand = @product.brand
    @images = @product.product_images
    @parents = Category.where(ancestry: nil)
    @product.build_brand
    @product.build_shipping
    # データベースから親カテゴリーのみ抽出し、配列化
    @category_parent = Category.where(ancestry: nil)
    @product.product_images.new
  end

  def update    
    @category_parent = Category.roots
    if @product.user_id == current_user.id && @product.update(product_params)
      redirect_to root_path
    else
      render 'edit'
    end
  end

  
  private
    def product_params
      params.require(:product).permit(:name, :text, :condition, :price, :trading_status, :category_id, product_images_attributes: [:image_url, :id, :_destroy],
      shipping_attributes: [:area, :fee, :handing_time, :shipping_type],
      brand_attributes: [:name]).merge(user_id: current_user.id)
    end

    def get_product
      @product = Product.find(params[:id])
    end

    def set_categories
      @categories = Category.where(ancestry: nil)
    end

    def show_all_instance
      @user = @product.user
      @images = @product.product_images.drop(1)
      @category_id = @product.category_id
      @category_parent = Category.find(@category_id)
      @category_child = Category.find(@category_id).children
      @category_grandchild = Category.find(@category_id).indirects
    end
  end
