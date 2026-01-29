# JWTの生成・検証
# JsonWebTokenクラスを使用するために読み込む
# require Rails.root.join("app/lib/json_web_token")

class Api::V1::AuthController < ApplicationController
  before_action :authenticate_user!, only: [ :me ]

  # ログイン
  def login
    user = User.find_by(email: params[:email])

    if user&.authenticate(params[:password])

      # userのJWTの作成
      token = JsonWebToken.encode({
        user_id: user.id,
        role: "user"
      })

      render json: {
        token: token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: "user"
        }
      }, status: :ok
    else
      render json: { error: "メールアドレスまたはパスワードが違います" },
             status: :unauthorized
    end
  end

  # ログイン中ユーザー取得
  def me
    user = current_user.reload

    render json: {
      user: {
        id: current_user.id,
        name: current_user.name,
        email: current_user.email,
        streak: current_user.streak,
        last_study_date: user.last_study_date
      }
    }
  end
end
