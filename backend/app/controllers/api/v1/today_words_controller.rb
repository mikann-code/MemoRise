class Api::V1::TodayWordsController < ApplicationController
  def show
    word = Word
      .joins(:wordbook)
      .where(wordbooks: { user_id: nil })
      .order("RAND()")
      .first

    if word.nil?
      render json: { error: "No words found" }, status: :not_found
      return
    end

    render json: {
      uuid: word.uuid,
      question: word.question,
      answer: word.answer
    }
  end
end
