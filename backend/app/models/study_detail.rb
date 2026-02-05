class StudyDetail < ApplicationRecord
  belongs_to :study_record

  validates :count, numericality: { greater_than: 0 }
  validates :correct_count, numericality: { greater_than_or_equal_to: 0 }

  validate :correct_not_exceed_count

  private

  def correct_not_exceed_count
    if correct_count > count
      errors.add(:correct_count, "は解いた問題数を超えられません")
    end
  end
end
