class Api::V1::UsersController < ApplicationController
  def create
    # ユーザー登録（クラスからインスタンス生成）
    user = User.new(user_params)

    if user.save
      render json: {
        message: "ユーザー登録成功",
        user: user
      }, status: :created
    else
      render json: {
        errors: user.errors.messages
      }, status: :unprocessable_entity
    end
  end

  private

  # Strong Parameters
  # paramsを直接使用するのは、危険なので、許可するパラメータを制限する
  def user_params
    params.require(:user).permit(
      :name,
      :email,
      :password,
      :password_confirmation
    )
  end
end
