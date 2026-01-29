class ApplicationController < ActionController::API
  include ActionController::HttpAuthentication::Token::ControllerMethods

  # userの認証を行う関数
  # 「！」は、強い処理を意味する
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
      nil
    end
  end

  def current_user
    @current_user
  end
end
