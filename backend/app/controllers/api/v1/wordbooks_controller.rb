class Api::V1::WordbooksController < ApplicationController
  def index
    wordbooks = current_user.wordbooks.order(created_at: :desc)

    render json: wordbooks
  end

  def create
    wordbook = current_user.wordbooks.create!(
      title: params[:title],
      description: params[:description]
    )

    render json: wordbook, status: :created
  end
end
