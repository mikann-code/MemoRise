class Api::V1::UserWordTagsController < ApplicationController
  before_action :authenticate_user!

  def index
    tags = current_user.user_word_tags.includes(:word)

    render json: tags.map { |t|
      {
        id: t.id,
        word_uuid: t.word.uuid,
        word_id: t.word_id,
        question: t.word.question,  
        answer: t.word.answer,     
        tag: t.tag
      }
    }
  end

  def create
    word = Word.find_by!(uuid: params[:word_uuid]) 
    tag = current_user.user_word_tags.create!(
      word_id: word.id,
      tag: "復習"
    )

    render json: tag, status: :created
  end

  # タグを外す
  def destroy
    word = Word.find_by!(uuid: params[:word_uuid])
    tag = current_user.user_word_tags.find_by!(
      word_id: word.id,
    )

    tag.destroy!
    head :no_content
  end
end
