require Rails.root.join("app/lib/json_web_token")

class Api::V1::AuthController < ApplicationController
  before_action :authenticate_user!, only: [ :me ]

  def me
    render json: {
      user: {
        id: @current_user.id,
        name: @current_user.name,
        email: @current_user.email
      }
    }
  end

  # ログイン（JWT）
  def login
    user = User.find_by(email: params[:email])

    if user&.authenticate(params[:password])
      token = JsonWebToken.encode(user_id: user.id)

      render json: {
        token: token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email
        }
      }, status: :ok
    else
      render json: { error: "メールアドレスまたはパスワードが違います" },
             status: :unauthorized
    end
  end
end
