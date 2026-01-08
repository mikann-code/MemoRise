class User < ApplicationRecord
  has_secure_password

  validates :name, presence: true
  validates :email, presence: true, uniqueness: true
  validates :password, length: { minimum: 6 }, confirmation: true, if: :password_digest_changed?
  validates :password_confirmation, presence: true, if: :password_digest_changed?

  # ユーザーの単語帳と学習記録
  has_many :wordbooks, dependent: :destroy
  has_many :study_records, dependent: :destroy

  # wordbooksの初期状態を作成
  after_create :create_default_wordbook

  # streak(連続学習記録) 管理
  def update_streak!
    today = Time.current.to_date

    # 初回学習
    if last_study_date.nil?
      self.streak = 1

    # 今日すでにカウント済み
    elsif last_study_date == today
      return

    # 昨日も学習していた（連続）
    elsif last_study_date == today - 1
      self.streak += 1

    # 途切れた
    else
      self.streak = 1
    end

    self.last_study_date = today
    save!
  end

  private

  def create_default_wordbook
    wordbooks.create!(
      title: "はじめての単語帳"
    )
  end
end
