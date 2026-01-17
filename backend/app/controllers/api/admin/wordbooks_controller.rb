class Api::Admin::WordbooksController < Api::Admin::BaseController
  before_action :set_wordbook, only: [:show, :update, :destroy]

  def index
    wordbooks = Wordbook.where(user_id: nil).order(created_at: :desc)

    wordbooks = wordbooks.where(level: params[:level]) if params[:level].present?
    wordbooks = wordbooks.where(label: params[:label]) if params[:label].present?

    render json: wordbooks
  end

  def show
    render json: @wordbook
  end

  def create
    wordbook = Wordbook.new(wordbook_params)
    wordbook.user = nil # admin 用に固定

    if wordbook.save
      render json: wordbook, status: :created
    else
      render json: { errors: wordbook.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def update
    if @wordbook.update(wordbook_params)
      render json: @wordbook
    else
      render json: { errors: @wordbook.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def destroy
    @wordbook.destroy
    head :no_content
  end

  private

  def set_wordbook
    @wordbook = Wordbook.where(user_id: nil).find_by!(uuid: params[:uuid])
  end

  def wordbook_params
    params.require(:wordbook).permit(
      :title,
      :description,
      :level,
      :label,
      :published
    )
  end
end
