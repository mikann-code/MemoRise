class ApplicationController < ActionController::API
  def authenticate_user!
    header = request.headers["Authorization"]
    return render json: { error: "トークンがありません" }, status: :unauthorized unless header

    token = header.split(" ").last
    decoded = JsonWebToken.decode(token)

    @current_user = User.find(decoded[:user_id])
  rescue
    render json: { error: "認証エラー" }, status: :unauthorized
  end
end