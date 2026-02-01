class Api::V1::MeController < ApplicationController
  before_action :authenticate_user!

  # プロフィールの更新
   def update
    attrs = profile_params

    # password は入力があるときだけ更新
    if attrs[:password].blank? && attrs[:password_confirmation].blank?
      attrs.delete(:password)
      attrs.delete(:password_confirmation)
    end

    current_user.update!(attrs)

    render json: {
      id: current_user.id,
      name: current_user.name,
      email: current_user.email,
      streak: current_user.streak,
      last_study_date: current_user.last_study_date
    }
  end

  private

  def profile_params
    params.permit(:name, :password, :password_confirmation)
  end
end
