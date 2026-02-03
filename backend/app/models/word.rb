class Word < ApplicationRecord
  belongs_to :wordbook, counter_cache: true
  belongs_to :user, optional: true, counter_cache: true

  before_validation :set_uuid, on: :create

  validates :uuid, presence: true, uniqueness: true
  validates :question, presence: true
  validates :answer, presence: true

  # タグずけされた単語の保存
  has_many :user_word_tags, dependent: :destroy
  has_many :tagging_users, through: :user_word_tags, source: :user

  # 公式単語と自作単語の整合性チェック
  validate :user_consistency

  private

  def set_uuid
    self.uuid ||= SecureRandom.uuid
  end

  def user_consistency
    return if wordbook.nil?

    # ユーザー単語帳なのに user_id がない → NG
    if wordbook.user_id.present? && user_id.nil?
      errors.add(:user_id, "ユーザー単語帳の単語には user_id が必要です")
    end

    # 公式単語帳なのに user_id がある → NG
    if wordbook.user_id.nil? && user_id.present?
      errors.add(:user_id, "公式単語には user_id を設定できません")
    end
  end
end
