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
    render json: serialize_wordbook(wordbook)
  end

  # 学習イベント
  def study
    wordbook = current_user.wordbooks.find_by!(uuid: params[:uuid])

    # 単語帳単位
    wordbook.touch(:last_studied)

    # ユーザー単位（streak）
    current_user.update_streak!

    # 連続学習日数更新
    streak_updated = current_user.update_streak!

    # カレンダー用
    StudyRecord.create!(
     user: current_user,
     wordbook: wordbook,
     study_date: Date.current
    )

    render json: {
      ok: true,
      streak: current_user.streak,
      streak_updated: streak_updated,
      last_study_date: current_user.last_study_date
    }
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
