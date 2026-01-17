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
               .where(study_date: start_date..end_date)
               .order(:study_date)
               .select(:id, :study_date, :study_count, :memo)

    render json: records
  end

  # 指定週(今週)の学習記録を取得
  def week
    start_date = Date.parse(params[:start_date])
    end_date   = start_date + 6

    records = current_user.study_records
               .where(study_date: start_date..end_date)
               .order(:study_date)
               .select(:study_date, :study_count, :memo)

    render json: records
  end

  # 最近30の学習記録を取得
  # 新しい⇒古いの順
  def recent
    records = current_user.study_records
                          .order(study_date: :desc)
                          .limit(30)

    render json: records
  end

  # 1日1回の作成 or 更新
  def create
    record = current_user.study_records.find_or_initialize_by(
      study_date: params[:study_date]
    )

    record.assign_attributes(study_record_params)

    if record.save
      render json: { status: "ok", record: record }, status: :ok
    else
      render json: { status: "error", errors: record.errors }, status: :unprocessable_entity
    end
  end

  private

  def study_record_params
    params.require(:study_record).permit(:study_date, :study_count, :memo)
  end
end
