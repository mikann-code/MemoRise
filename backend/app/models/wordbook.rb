class Wordbook < ApplicationRecord
  # admin用 / user用 両対応
  belongs_to :user, optional: true
  has_many :words, dependent: :destroy

  # 階層構造対応
  # parent_idを持つことで、親単語帳・子単語帳の関係を表現
  has_many :children,
    class_name: "Wordbook",
    foreign_key: :parent_id,
    dependent: :destroy

  belongs_to :parent,
    class_name: "Wordbook",
    optional: true

  before_validation :set_uuid, on: :create

  validates :uuid, presence: true, uniqueness: true
  validates :title, presence: true

  # 論理削除済みを除外するスコープ
  scope :active, -> { where(deleted_at: nil) }

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
