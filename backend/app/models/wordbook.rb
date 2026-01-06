class Wordbook < ApplicationRecord
  belongs_to :user
  has_many :words, dependent: :destroy

  before_validation :set_uuid, on: :create

  validates :uuid, presence: true, uniqueness: true
  validates :title, presence: true

  # 一度でも学習したか？
  def studied?
    last_studied.present?
  end

  # 今日学習したか？
  def studied_today?
    last_studied&.to_date == Time.current.to_date
  end

  private

  def set_uuid
    self.uuid ||= SecureRandom.uuid
   end
end
