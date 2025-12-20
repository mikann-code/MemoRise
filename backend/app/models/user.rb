class User < ApplicationRecord
  has_secure_password

  validates :name, presence: true
  validates :email, presence: true, uniqueness: true
  validates :password, length: { minimum: 6 }, confirmation: true, if: :password_digest_changed?
  validates :password_confirmation, presence: true, if: :password_digest_changed?

  # wordbooks association
  has_many :wordbooks, dependent: :destroy
end
