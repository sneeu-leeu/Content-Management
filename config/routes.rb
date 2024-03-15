Rails.application.routes.draw do
  get 'replies/index'
  get 'replies/create'
  get 'replies/update'
  namespace :api do
    namespace :v1 do
      get 'replies/index'
      get 'replies/create'
      get 'replies/update'
      resources :folders, only: [:index, :create, :show, :destroy] do
        resources :uploads, only: [:index, :create, :show, :destroy] do 
          resources :comments, only: [:index, :create, :update] do
            resources :replies, only: [:index, :creat, :update]
          end
        end
      end
    end
  end

  root "home#index"
  get "up" => "rails/health#show", as: :rails_health_check
end
