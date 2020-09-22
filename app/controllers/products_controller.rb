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
    @images = @product.product_images.drop(1)
    @parents = Category.where(ancestry: nil)
  end

  def edit
    @product = Product.find(params[:id])


  end

  def update
    @product = Product.find(params[:id])
    if @product.update(product_params)
      redirect_to show_product_path, notice: '更新しました'
    else
      render :edit
    end
  end
  

  def create
    @category_parent = Category.where(ancestry: nil)
    @product = Product.new(product_params)         
    if @product.save
      flash[:alert] = '出品が完了しました'
      redirect_to new_product_path 
   
    else
      flash[:alert] = '出品に失敗しました'
      @product.product_images.new
      render :new
    end 
  end
  
  private
    def product_params
      params.require(:product).permit(:name, :text, :condition, :price, :trading_status, :category_id, product_images_attributes: [:image_url, :product_id],
      shipping_attributes: [:area, :fee, :handing_time, :shipping_type],
      brand_attributes: [:name]).merge(user_id: current_user.id)
    end
  end
  
