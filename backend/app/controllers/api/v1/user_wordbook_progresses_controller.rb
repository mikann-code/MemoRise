class Api::V1::UserWordbookProgressesController < ApplicationController
  before_action :authenticate_user!

  # 進捗一覧取得
  def index
    progresses = current_user.user_wordbook_progresses

    render json: progresses.map { |p|
      {
        wordbook_id: p.wordbook_id,
        completed: p.completed
      }
    }
  end

  # 完了登録
  def complete
    progress = UserWordbookProgress.find_or_initialize_by(
      user_id: current_user.id,
      wordbook_id: params[:wordbook_id]
    )

    progress.completed = true
    progress.save!

    render json: { status: "ok" }
  end
end