Rails.application.routes.draw do
  root 'home#index'
  devise_for :users
  resources :users, only: [:index, :edit, :update, :show]
  resources :products do
      collection do
        get 'get_category_children', to: 'products#get_category_children', defaults: { format: 'json' }
        get 'get_category_grandchildren', to: 'products#get_category_grandchildren', defaults: { format: 'json' }
      end
      
      resources :orders, only: [:show, :create]
  end



  
  resources :categories, only: [:index, :new, :show]

  resources :credit_cards, only: [:new, :create, :show, :destroy] 
  
end