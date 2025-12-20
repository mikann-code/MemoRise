class ApplicationController < ActionController::API
  before_action :authenticate_user!

  private

  def authenticate_user!
    header = request.headers["Authorization"]
    return render json: { error: "トークンがありません" }, status: :unauthorized unless header

    token = header.split(" ").last
    decoded = JsonWebToken.decode(token)

    @current_user = User.find(decoded[:user_id])
  rescue StandardError
    render json: { error: "認証エラー" }, status: :unauthorized
  end

  def current_user
    @current_user
  end
end
