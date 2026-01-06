class ApplicationController < ActionController::API
  include ActionController::HttpAuthentication::Token::ControllerMethods

  def authenticate_user!
    header = request.headers["Authorization"]
    token = header&.split(" ")&.last

    unless token
      render json: { error: "認証エラー" }, status: :unauthorized
      return
    end

    begin
      decoded = JsonWebToken.decode(token)
      @current_user = User.find(decoded[:user_id])
    rescue StandardError
      render json: { error: "認証エラー" }, status: :unauthorized
      return
    end
  end

  def current_user
    @current_user
  end
end
