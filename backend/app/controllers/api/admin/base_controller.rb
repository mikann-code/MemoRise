class Api::Admin::BaseController < ApplicationController
  before_action :authenticate_admin!

  private

  def authenticate_admin!
    header = request.headers["Authorization"]
    token = header&.split(" ")&.last

    begin
      payload = JsonWebToken.decode(token)

      unless payload["role"] == "admin"
        render json: { error: "Forbidden" }, status: :forbidden
        return
      end

      @current_admin = AdminUser.find(payload["admin_id"])

    rescue StandardError
      render json: { error: "Unauthorized" }, status: :unauthorized
    end
  end

  def current_admin
    @current_admin
  end
end
