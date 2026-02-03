class Api::V1::WordsController < ApplicationController
  before_action :authenticate_user!
  before_action :set_wordbook
  before_action :set_word, only: [ :destroy ]

  def index
    words = @wordbook.words.order(created_at: :desc)
    render json: words
  end

  def create
    word = @wordbook.words.new(word_params)
    word.user = current_user   

    if word.save
      render json: word, status: :created
    else
      render json: { errors: word.errors.full_messages }, status: :unprocessable_entity
    end
  end


  def destroy
    @word.destroy
    head :no_content
  end

  private

  def set_wordbook
    @wordbook = current_user.wordbooks.find_by!(uuid: params[:wordbook_uuid])
  end

  def set_word
    @word = @wordbook.words.find_by!(uuid: params[:uuid])
  end

  def word_params
    params.require(:word).permit(:question, :answer)
  end
end
