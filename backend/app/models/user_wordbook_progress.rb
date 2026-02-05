class UserWordbookProgress < ApplicationRecord
  belongs_to :user
  # 子 単語帳を想定
  belongs_to :wordbook

  validates :user_id, uniqueness: { scope: :wordbook_id }
end
