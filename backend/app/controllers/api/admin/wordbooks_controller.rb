require "csv"
class Api::Admin::WordbooksController < Api::Admin::BaseController
  before_action :set_wordbook, only: [:show, :update, :destroy]

  # 親 単語帳の表示
  def index
    wordbooks = Wordbook.where(user_id: nil, parent_id: nil).includes(:children).order(created_at: :desc)

    wordbooks = wordbooks.where(level: params[:level]) if params[:level].present?
    wordbooks = wordbooks.where(label: params[:label]) if params[:label].present?

    render json: wordbooks
  end

  # 子 単語帳の表示
  def children
  parent = Wordbook
    .where(user_id: nil, parent_id: nil)
    .find_by!(uuid: params[:uuid])

  render json: parent.children.order(:part)
  end

  def show
    render json: @wordbook
  end

  def create
    # admin 用 user = nil に固定
    wordbook = Wordbook.new(wordbook_params)
    wordbook.user = nil 

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

  # CSVインポート
  def import_csv
    wordbook = Wordbook.find_by!(uuid: params[:uuid])
    file = params[:file]

    if file.nil?
      return render json: { error: "CSVファイルがありません" }, status: 400
    end

    success_count = 0
    errors = []

    CSV.foreach(file.path, headers: true).with_index(2) do |row, line|
      begin
        wordbook.words.create!(
          question: row["question"],
          answer: row["answer"]
        )
        success_count += 1
      rescue => e
        errors << "行#{line}: #{e.message}"
      end
    end

    render json: {
      success_count: success_count,
      errors: errors
    }
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
    )
  end
end
