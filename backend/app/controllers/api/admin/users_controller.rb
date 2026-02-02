class Api::Admin::UsersController < ApplicationController
  def index
    users = User.order(created_at: :desc)

    render json: users.map { |u|
      {
        id: u.id,
        name: u.name,
        email: u.email,
        created_at: u.created_at.to_date,
        streak: u.streak
      }
    }
  end
end
