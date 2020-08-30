Rails.application.routes.draw do
  devise_for :users
  resources :users, only: [:index, :edit, :update]
  root 'products#index'
  get 'products/my_page'
  get 'products/logout'
  resources :products, only: [:index, :new, :create]
  resources :products, only: [:index, :new, :create, :show] do
    collection do
      get 'get_category_children', to: 'products#get_category_children', defaults: { format: 'json' }
      get 'get_category_grandchildren', to: 'products#get_category_grandchildren', defaults: { format: 'json' }
    end
  end
  resources :orders, only: :show
end
