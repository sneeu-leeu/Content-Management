Rails.application.routes.draw do

  root "home#index"
  get "home/index"
  namespace :api do
    namespace :v1 do
      resources :folders, only: [:index, :create, :show, :destroy] do
        resources :uploads, only: [:index, :create, :show, :destroy] do 
          resources :comments, only: [:index, :create, :update] do
            member do
              patch :soft_delete
            end
            resources :replies, only: [:index, :create, :update]
          end
        end
      end
    end
  end
  devise_for :users

  
  get "up" => "rails/health#show", as: :rails_health_check
end
