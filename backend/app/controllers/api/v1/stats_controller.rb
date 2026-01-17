class Api::V1::StatsController < ApplicationController
  before_action :authenticate_user!

  def total_words
    total = current_user.words.count
    render json: { total_words: total }, status: :ok
  end
end
