class Api::V1::PublicWordbooksController < ApplicationController
  # 一覧表示はログイン不要

  def index
    # 配布用（公式）単語帳：user_id が NULL のもの
    public_wordbooks = Wordbook
      .where(user_id: nil, parent_id: nil)
      .order(created_at: :desc)

    render json: public_wordbooks.map { |wb| serialize_wordbook(wb) }
  end

  def show
    wordbook = Wordbook
      .where(user_id: nil)
      .find_by!(uuid: params[:uuid])
    render json: serialize_wordbook(wordbook)
  end

  def children
    parent = Wordbook.find_by!(uuid: params[:uuid])

    children = Wordbook
      .where(user_id: nil, parent_id: parent.id)
      .order(:part)

    render json: children.map { |wb| serialize_child_wordbook(wb) }
  end

  def words
  wordbook = Wordbook
    .where(user_id: nil)
    .find_by!(uuid: params[:uuid])

  words = wordbook.words.order(:id)

  render json: words.map { |w| serialize_word(w) }
  end

  private

  def serialize_wordbook(wordbook)
    wordbook.as_json(
    only: [
      :uuid,
      :title,
      :description,
      :words_count,
      :level,
      :label,
      :part
    ]
    )
  end

   def serialize_child_wordbook(wordbook)
    wordbook.as_json(
      only: [
      :uuid,
      :title,
      :description,
      :words_count,
      :level,
      :label,
      :part
    ]
    )
  end

  def serialize_word(word)
  word.as_json(
    only: [ :uuid, :question, :answer, :pos ]
  )
  end
end
