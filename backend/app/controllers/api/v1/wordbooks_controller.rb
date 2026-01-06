class Api::V1::WordbooksController < ApplicationController
  before_action :authenticate_user!

  def index
    wordbooks = current_user.wordbooks
      .order(last_studied: :desc, created_at: :desc)

    render json: wordbooks.map { |wb| serialize_wordbook(wb) }
  end

  def create
    wordbook = current_user.wordbooks.create!(
      title: params[:title],
      description: params[:description]
    )

    render json: serialize_wordbook(wordbook), status: :created
  end

  def show
    wordbook = current_user.wordbooks.find_by!(uuid: params[:id])

    # 単語帳詳細を開いたら「学習した」とみなす
    wordbook.touch(:last_studied)

    render json: serialize_wordbook(wordbook)
  end

  private

  def serialize_wordbook(wordbook)
    wordbook.as_json(
      only: [:uuid, :title, :description, :words_count, :last_studied]
    ).merge(
      studied_today: wordbook.studied_today?
    )
  end
end
