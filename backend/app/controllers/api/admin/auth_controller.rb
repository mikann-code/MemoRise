class Api::Admin::AuthController < ApplicationController
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
end
