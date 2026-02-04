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

  # 完了登録（次のPartを解放）
  def complete
    ActiveRecord::Base.transaction do
      # ① 今のPartの進捗を完了にする
      progress = UserWordbookProgress.find_or_initialize_by(
        user_id: current_user.id,
        wordbook_id: params[:wordbook_id]
      )
      progress.update!(completed: true)

      current_wordbook = Wordbook.find(params[:wordbook_id])

      # ② 同じ親の中で「次のPart」を取得（order_index基準）
      next_wordbook = Wordbook
        .where(parent_id: current_wordbook.parent_id)
        .where("order_index > ?", current_wordbook.order_index)
        .order(:order_index)
        .first

      # ③ 次のPartがあれば解放（progressを作る）
      if next_wordbook
        UserWordbookProgress.find_or_create_by!(
          user_id: current_user.id,
          wordbook_id: next_wordbook.id
        )
      end
    end

    render json: { status: "ok" }
  end
end