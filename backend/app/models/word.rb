class Word < ApplicationRecord
  belongs_to :wordbook, counter_cache: true

  before_validation :set_uuid, on: :create

  validates :uuid, presence: true, uniqueness: true
  validates :question, presence: true
  validates :answer, presence: true

  # タグずけされた単語の保存
  has_many :user_word_tags, dependent: :destroy
  has_many :tagging_users, through: :user_word_tags, source: :user

  private

  def set_uuid
    self.uuid ||= SecureRandom.uuid
  end
end
