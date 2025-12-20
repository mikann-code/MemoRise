Rails.application.routes.draw do
  get "up" => "rails/health#show", as: :rails_health_check

  namespace :api do
    namespace :v1 do
      # 認証
      post "login", to: "auth#login"
      get "me", to: "auth#me"

      # 単語帳
      resources :wordbooks, only: [ :index, :create ] do
      resources :words, only: [ :index, :create ]
    end
    end
  end
end
