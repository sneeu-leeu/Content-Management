Rails.application.routes.draw do
  root "home#index"
  # devise_for :users, controllers: { omniauth_callbacks: 'users/omniauth_callbacks' }
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

  
  get "up" => "rails/health#show", as: :rails_health_check
end
