class Api::V1::AuthController < ApplicationController

  # ログイン機能
  def login
    user = User.find_by(email: params[:email])

    if user&.authenticate(params[:password])
      session[:user_id] = user.id
      render json: { message: "ログイン成功", user: user }, status: :ok
    else
      render json: { error: "メールアドレスまたはパスワードが違います" }, status: :unauthorized
    end
  end

  # ログアウト
  def logout
    session.delete(:user_id)
    render json: { message: "ログアウトしました" }
  end

  # ログイン中のユーザー情報
  def me
    if session[:user_id]
      user = User.find(session[:user_id])
      render json: { user: user }
    else
      render json: { user: nil }
    end
  end

end
