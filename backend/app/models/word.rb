class Word < ApplicationRecord
  belongs_to :wordbook, counter_cache: true

  before_validation :set_uuid, on: :create

  validates :uuid, presence: true, uniqueness: true
  validates :question, presence: true
  validates :answer, presence: true

  private

  def set_uuid
    self.uuid ||= SecureRandom.uuid
  end
end
