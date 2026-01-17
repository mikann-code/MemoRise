class Wordbook < ApplicationRecord
  # admin用 / user用 両対応
  belongs_to :user, optional: true
  has_many :words, dependent: :destroy

  before_validation :set_uuid, on: :create

  validates :uuid, presence: true, uniqueness: true
  validates :title, presence: true

  # admin用 wordbook のみ必須
  validates :level, :label, presence: true, if: :admin_wordbook?

  # 一度でも学習したか
  def studied?
    last_studied.present?
  end

  # 今日学習したか
  def studied_today?
    last_studied&.to_date == Time.current.to_date
  end

  # admin用か
  def admin_wordbook?
    user_id.nil?
  end

  private

  def set_uuid
    self.uuid ||= SecureRandom.uuid
   end
end
