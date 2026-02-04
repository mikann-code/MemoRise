require "csv"

class Api::Admin::WordbooksController < Api::Admin::BaseController
  before_action :set_wordbook, only: [:show, :update, :destroy]

  # 親 単語帳の表示
  def index
    wordbooks = Wordbook.where(user_id: nil, parent_id: nil)
                        .includes(:children)
                        .order(created_at: :desc)

    wordbooks = wordbooks.where(level: params[:level]) if params[:level].present?
    wordbooks = wordbooks.where(label: params[:label]) if params[:label].present?

    render json: wordbooks
  end

  # 子 単語帳の表示
  def children
    parent = Wordbook
      .where(user_id: nil, parent_id: nil)
      .find_by!(uuid: params[:uuid])

    render json: parent.children.order(:order_index)
  end

  def show
    render json: @wordbook
  end

  def create
    wordbook = Wordbook.new
    wordbook.user = nil

    # 親UUIDが来ていれば子単語帳
    if params[:wordbook]&.[](:parent_uuid).present?
      parent = Wordbook.where(user_id: nil, parent_id: nil).find_by!(uuid: params[:wordbook][:parent_uuid])

      # 親と同じ値をコピー
      wordbook.title       = parent.title
      wordbook.description = parent.description
      wordbook.level       = parent.level
      wordbook.label       = parent.label
      
      # 子だけの値
      wordbook.parent_id = parent.id
      wordbook.part = params[:wordbook][:part]

      # order_index を「同じ親の最大値 + 1」にする and 最初の子供単語帳作成時の初期値は1になる
      max_order = Wordbook.where(parent_id: parent.id).maximum(:order_index) || 0
      wordbook.order_index = max_order + 1

      ok = wordbook.save
    else
      # 親単語帳
      ok = wordbook.update(parent_wordbook_params)
    end

    if ok
      render json: wordbook, status: :created
    else
      render json: { errors: wordbook.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def update
    if @wordbook.parent_id.nil?
      # 親単語帳を更新
      ok = @wordbook.update(parent_wordbook_params)

      if ok
        # 子単語帳も同じ値に更新
        @wordbook.children.update_all(
          title:       @wordbook.title,
          description: @wordbook.description,
          level:       @wordbook.level,
          label:       @wordbook.label,
          updated_at:  Time.current
        )
      end
    else
      # 子単語帳
      ok = @wordbook.update(child_wordbook_params)
    end

    if ok
      render json: @wordbook
    else
      render json: { errors: @wordbook.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def destroy
    @wordbook.destroy
    render json: {
      message: @wordbook.parent_id.nil? ? "親単語帳と子単語帳を削除しました" : "子単語帳を削除しました"
    }
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

  # 親単語帳用
  def parent_wordbook_params
    params.require(:wordbook).permit(
      :title,
      :description,
      :level,
      :label
    )
  end

  # 子単語帳用
  def child_wordbook_params
    params.require(:wordbook).permit(:part, :order_index)
  end
end
