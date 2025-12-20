class Word < ApplicationRecord
  belongs_to :wordbook

  before_validation :set_uuid, on: :create
  before_validation :set_defaults, on: :create

  validates :uuid, presence: true, uniqueness: true
  validates :question, presence: true
  validates :answer, presence: true
  validates :pos, presence: true

  private

  def set_uuid
    self.uuid ||= SecureRandom.uuid
  end

  def set_defaults
    self.pos ||= []
  end
end
