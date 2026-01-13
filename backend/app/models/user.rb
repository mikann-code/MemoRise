class User < ApplicationRecord
  has_secure_password

  # ユーザー情報のバリデーション
  validates :name, presence: true
  validates :email, presence: true, uniqueness: true
  validates :password, length: { minimum: 6 }, confirmation: true, if: :password_digest_changed?
  validates :password_confirmation, presence: true, if: :password_digest_changed?

  # ユーザーの単語帳と学習記録
  # wordsは、各wordbooksに紐ずくためユーザーに紐ずくわけではない
  has_many :wordbooks, dependent: :destroy
  has_many :study_records, dependent: :destroy

  # wordbooksの初期状態を作成
  # Userが初めて作成されたときに実行
  after_create :create_default_wordbook

  # userのstreak(連続学習記録) 管理
  def update_streak!
    today = Time.current.to_date

    # ガード節：今日すでに更新されている場合は何もしない
    return false if last_study_date == today

    new_streak =
    if last_study_date.nil?
      1
    elsif last_study_date == today - 1
      streak + 1
    else
      1
    end

    update_columns(
      streak: new_streak,
      last_study_date: today,
      updated_at: Time.current
    )
  end

  private

  # id等は自動生成
  def create_default_wordbook
    wordbooks.create!(
      title: "はじめての単語帳"
    )
  end
end
