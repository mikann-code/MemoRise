class Api::V1::UserWordbookProgressesController < ApplicationController
  before_action :authenticate_user!

  # 進捗一覧取得（親単語帳単位）
  def index
    parent = Wordbook.find_by!(uuid: params[:parent_id])

    parts = Wordbook
      .where(parent_id: parent.id)
      .order(:order_index)

    progresses = current_user
      .user_wordbook_progresses
      .where(wordbook_id: parts.pluck(:id))
      .index_by(&:wordbook_id)

    if progresses.empty? && parts.any?
      first_part = parts.first
      progress = UserWordbookProgress.create!(
        user_id: current_user.id,
        wordbook_id: first_part.id,
        completed: false
      )
      progresses[first_part.id] = progress
    end

    result = parts.map do |part|
      progress = progresses[part.id]

      {
        wordbook_uuid: part.uuid,
        part: part.part,
        unlocked: progress.present?,
        completed: progress&.completed || false
      }
    end

    render json: result
  end

  # 完了登録（次のPartを解放）
  def complete
    ActiveRecord::Base.transaction do
      current_wordbook = Wordbook.find_by!(uuid: params[:wordbook_uuid])

      progress = UserWordbookProgress.find_or_initialize_by(
        user_id: current_user.id,
        wordbook_id: current_wordbook.id
      )
      progress.update!(completed: true)

      next_wordbook = Wordbook
        .where(parent_id: current_wordbook.parent_id)
        .where("order_index > ?", current_wordbook.order_index)
        .order(:order_index)
        .first

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
