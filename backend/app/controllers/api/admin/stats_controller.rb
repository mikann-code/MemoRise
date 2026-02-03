class Api::Admin::StatsController < Api::Admin::BaseController
  def index
    render json: {
      users_count: User.count,
      public_wordbooks_count: Wordbook.where(user_id: nil, parent_id: nil).count
    }
  end
end
