class User < ApplicationRecord
  has_secure_password

  validates :name, presence: true
  validates :email, presence: true, uniqueness: true
  validates :password, length: { minimum: 6 }, confirmation: true, if: :password_digest_changed?
  validates :password_confirmation, presence: true, if: :password_digest_changed?

  # wordbooks association
  has_many :wordbooks, dependent: :destroy

  # wordbooksの初期状態を作成
  after_create :create_default_wordbook

  private

  def create_default_wordbook
    wordbooks.create!(
      title: "はじめての単語帳"
    )
  end
end
