class Api::V1::StudyRecordsController < ApplicationController
  # 指定月の学習記録を返す
  def index
  end

  # 1日1回の作成 or 更新
  def create
    record = current_user.study_records.find_or_initialize_by(
      study_date: params[:study_date]
    )

    record.study_count = params[:study_count]
    record.memo        = params[:memo]

    if record.save
      render json: { status: "ok", record: record }, status: :ok
    else
      render json: { status: "error", errors: record.errors }, status: :unprocessable_entity
    end
  end

  def update
  end
end
