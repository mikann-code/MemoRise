Rails.application.routes.draw do
  # ヘルスチェック
  get "up" => "rails/health#show", as: :rails_health_check

  namespace :api do
    namespace :v1 do
      # ユーザー追加
      resources :users, only: [ :create ]

      # 認証
      post "login", to: "auth#login"
      get  "me",    to: "auth#me"

      # ユーザー情報
      get "stats/total_words", to: "stats#total_words"

      # 単語帳
      resources :wordbooks, param: :uuid, only: [ :index, :create , :destroy] do
        resources :words, param: :uuid, only: [:index, :create, :destroy]

        # 単語中ごとの学習イベント 
        post :study, on: :member
      end

      # 公開単語帳一覧取得
      resources :public_wordbooks, param: :uuid, only: [:index] do
        get :children, on: :member
        get :words, on: :member
      end

      # 学習記録API
      resources :study_records, only: [ :index, :create ] do
        collection do
          get :recent       
          get :week         
        end
      end
    end

    # admin
    namespace :admin do
      post "login", to: "auth#login"

      resources :wordbooks, param: :uuid do
        get :children, on: :member
        post :import_csv, on: :member
        resources :words, param: :uuid
      end
    end

  end
end
