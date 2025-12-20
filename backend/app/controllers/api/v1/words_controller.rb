class Api::V1::WordsController < ApplicationController
  # 単語一覧
  def index
    wordbook = current_user.wordbooks.find_by!(uuid: params[:wordbook_id])
    words = wordbook.words.order(created_at: :desc)

    render json: words
  end

  # 単語作成
  def create
    wordbook = current_user.wordbooks.find_by!(uuid: params[:wordbook_id])

    word = wordbook.words.create!(
      question: params[:question],
      answer: params[:answer],
      pos: params[:pos]
    )

    render json: word, status: :created
  end
end
