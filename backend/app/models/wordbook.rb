class Wordbook < ApplicationRecord
  belongs_to :user
  has_many :words, dependent: :destroy

  before_validation :set_uuid, on: :create

  validates :uuid, presence: true, uniqueness: true
  validates :title, presence: true

  private

  def set_uuid
    self.uuid ||= SecureRandom.uuid
  end
end
