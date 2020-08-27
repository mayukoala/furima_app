class ApplicationController < ActionController::Base
  before_action :basic_auth, if: :production?
  # before_action :authenticate_user!
  before_action :configure_permitted_parameters, if: :devise_controller?

  protected

  def basic_auth
    authenticate_or_request_with_http_basic do |nickname, password|
      username == Rails.application.credentials[:basic_auth][:user] &&
      password == Rails.application.credentials[:basic_auth][:pass]
    end
  end

  def production?
    Rails.env.production?
  end

  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(:sign_up, keys: [:nickname,:family_name,:first_name,:family_name_kana,:first_name_kana,:birth,:password,:email])

  end

end