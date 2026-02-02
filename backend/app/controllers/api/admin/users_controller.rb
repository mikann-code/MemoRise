class Api::Admin::UsersController < ApplicationController
  def index
    users = User
      .left_joins(wordbooks: :words)
      .group("users.id")
      .order(created_at: :desc)
      .select("users.*, COUNT(words.id) AS total_words")

    render json: users.map { |u|
      {
        id: u.id,
        name: u.name,
        email: u.email,
        created_at: u.created_at.to_date,
        streak: u.streak,
        total_words: u.total_words.to_i
      }
    }
  end
end
