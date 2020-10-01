class UsersController < ApplicationController
  def index
    @parents = Category.where(ancestry: nil)
    @user = current_user
  end

  def show
    @parents = Category.where(ancestry: nil)
  end
  
end
