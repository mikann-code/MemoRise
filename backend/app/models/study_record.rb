class StudyRecord < ApplicationRecord
  belongs_to :user
  has_many :study_details, dependent: :destroy

  validates :study_date, presence: true
  validates :study_count, numericality: { only_integer: true, greater_than_or_equal_to: 0 }
end
