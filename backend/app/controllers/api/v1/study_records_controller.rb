class Api::V1::StudyRecordsController < ApplicationController
  before_action :authenticate_user!
  # FullCalendar の「月移動」に合わせて,指定月の学習記録のみ取得することで、軽量に取得することを想定
  # 指定月の学習記録を取得
  def index
    # パラメータ取得
    year  = params[:year].to_i
    month = params[:month].to_i

    # 月初と月末を計算
    start_date = Date.new(year, month, 1)
    end_date   = start_date.end_of_month

    records = current_user.study_records
               .includes(:study_details)
               .where(study_date: start_date..end_date)
               .order(:study_date)

    render json: records.as_json(include: :study_details)
  end

  # 指定週(今週)の学習記録を取得
  def week
    start_date = Date.parse(params[:start_date])
    end_date   = start_date + 6

    records = current_user.study_records
               .includes(:study_details)
               .where(study_date: start_date..end_date)
               .order(:study_date)

    render json: records.as_json(include: :study_details)
  end

  # 最近30の学習記録を取得
  # 新しい⇒古いの順
  def recent
    records = current_user.study_records
               .includes(:study_details)
               .order(study_date: :desc)
               .limit(30)

    render json: records.as_json(include: :study_details)
  end

  # その日の学習記録
  # 1日1回の作成 or 更新
  def create
    ActiveRecord::Base.transaction do
      # その日の study_record（合計用）
      record = current_user.study_records.find_or_initialize_by(
        study_date: params[:study_date]
      )

      # 合計値を更新
      record.study_count ||= 0
      record.study_count += params[:count].to_i
      record.save!

      child = Wordbook.find_by!(uuid: params[:children_id])
      parent = child.parent

      full_title = "#{parent.title} #{child.part}"

      # 学習記録の追加
      record.study_details.create!(
        title: full_title,                # 例: "英検2級 part1"
        rate: params[:rate],            
        count: params[:count],           
        correct_count: params[:correct_count].to_i,
        children_id: params[:children_id]
      )

      render json: { status: "ok", record: record }, status: :ok
    end
  rescue ActiveRecord::RecordInvalid => e
    render json: { status: "error", message: e.message }, status: :unprocessable_entity
  end

  private

  def study_record_params
    params.require(:study_record).permit(:study_date, :study_count, :memo)
  end
end
