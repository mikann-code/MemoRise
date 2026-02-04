class UserWordbookProgress < ApplicationRecord
  belongs_to :user
  belongs_to :wordbook_child

  validates :user_id, uniqueness: { scope: :wordbook_id }
end
