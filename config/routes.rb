Rails.application.routes.draw do
  root 'products#index'
  get 'products/my_page'
  resources :products, only: [:index, :new, :create]
  resources :orders, only: :show
end
