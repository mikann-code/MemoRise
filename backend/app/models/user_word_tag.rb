class UserWordTag < ApplicationRecord
  belongs_to :user
  belongs_to :word

  validates :tag, presence: true
  validates :user_id, uniqueness: { scope: [:word_id, :tag] }
end
