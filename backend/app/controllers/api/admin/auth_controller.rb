class Api::Admin::AuthController < ApplicationController
  # admin/me 用
  before_action :authenticate_admin!, only: [:me]

  # AdminUser をログインさせる
  def login
    admin = AdminUser.find_by(email: params[:email])

    if admin&.authenticate(params[:password])
      token = JsonWebToken.encode({
        admin_id: admin.id,
        role: "admin"
      })

      render json: {
        token: token,
        admin: {
          id: admin.id,
          email: admin.email,
          role: "admin"
        }
      }, status: :ok
    else
      render json: { error: "メールアドレスまたはパスワードが違います" },
             status: :unauthorized
    end
  end

  # 🔽 追加
  def me
    render json: {
      user: {
        id: current_admin.id,
        email: current_admin.email,
        role: "admin"
      }
    }
  end

  private

  # 管理者トークン認証
  def authenticate_admin!
    header = request.headers["Authorization"]
    token = header&.split(" ")&.last

    decoded = JsonWebToken.decode(token)
    @current_admin = AdminUser.find(decoded[:admin_id])
  rescue
    render json: { error: "認証エラー" }, status: :unauthorized
  end

  def current_admin
    @current_admin
  end
end
