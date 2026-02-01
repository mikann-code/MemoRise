class Api::V1::WordbooksController < ApplicationController
  # ユーザーに紐づく単語帳一覧取得
  before_action :authenticate_user!

  def index
    wordbooks = current_user.wordbooks.active
  .order(last_studied: :desc, created_at: :desc)

    render json: wordbooks.map { |wb| serialize_wordbook(wb) }
  end

  def create
    # ユーザーに紐づく単語帳は5個まで（初期）
    if current_user.wordbooks.active.count >= 5
    render json: { error: "単語帳は5個まで作成できます" }, status: :unprocessable_entity
    return
    end

    wordbook = current_user.wordbooks.create!(wordbook_params)

    render json: serialize_wordbook(wordbook), status: :created
  end

  def destroy
    wordbook = current_user.wordbooks.active.find_by!(uuid: params[:uuid])
    wordbook.update!(deleted_at: Time.current)
    head :no_content
  end

  def show
    wordbook = current_user.wordbooks.active.find_by!(uuid: params[:uuid])
    render json: serialize_wordbook(wordbook)
  end

  def update
    wordbook = current_user.wordbooks.active.find_by!(uuid: params[:uuid])

    wordbook.update!(wordbook_params)

    render json: serialize_wordbook(wordbook)
  end

  # 学習イベント
  def study
    wordbook = current_user.wordbooks.active.find_by!(uuid: params[:uuid])

    # 単語帳単位
    wordbook.touch(:last_studied)

    # 連続学習日数更新
    streak_updated = current_user.update_streak!

    render json: {
      ok: true,
      streak: current_user.streak,
      streak_updated: streak_updated,
      last_study_date: current_user.last_study_date
    }
  end

  private

  def wordbook_params
    params.require(:wordbook).permit(:title, :description, :label )
  end

  def serialize_wordbook(wordbook)
    wordbook.as_json(
      only: [ :uuid, :title, :description, :words_count, :last_studied, :label ,:deleted_at ]
    ).merge(
      studied_today: wordbook.studied_today?
    )
  end
end
