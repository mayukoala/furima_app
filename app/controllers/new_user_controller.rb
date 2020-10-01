class NewUserController < ApplicationController
  def index
    @users = User.all
  end
  
  private
  def user_params
    params.require(:user).permit(:nickname,:family_name,:first_name,:family_name_kana,:first_name_kana,:email,:birthday,:password)
  end
end