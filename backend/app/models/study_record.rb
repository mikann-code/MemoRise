class StudyRecord < ApplicationRecord
  belongs_to :user

  def streak_count
  records = study_records.order(study_date: :desc)
  count = 0
  today = Date.current

  records.each do |record|
    break if record.study_date != today - count
    count += 1
  end

  count
end
end
