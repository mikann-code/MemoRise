class Api::V1::WordsController < ApplicationController
  before_action :set_wordbook

  # GET /api/v1/wordbooks/:wordbook_id/words
  def index
    words = @wordbook.words.order(created_at: :desc)
    render json: words
  end

  # POST /api/v1/wordbooks/:wordbook_id/words
  def create
    word = @wordbook.words.create!(word_params)
    render json: word, status: :created
  end

  private

  def set_wordbook
    @wordbook = current_user.wordbooks.find_by!(uuid: params[:wordbook_id])
  end

  def word_params
    params.require(:word).permit(:question, :answer, pos: [])
  end
end
