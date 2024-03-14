Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      # get 'folders/index'
      # post 'folders/create'
      # get '/show/:id', to: 'folders#show'
      # delete '/destroy/:id', to: 'folders#destroy'
      resources :folders, only: [:index, :create, :show, :destroy] do
        resources :uploads, only: [:index, :create, :show, :destroy]
      end
    end
  end

  # Defines the root path route ("/")
  root "home#index"

  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

 
end
