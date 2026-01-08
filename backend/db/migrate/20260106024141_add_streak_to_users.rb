class AddStreakToUsers < ActiveRecord::Migration[8.1]
  # ユーザーに連続学習日数と最終学習日を追加する
  def change
    add_column :users, :streak, :integer, null: false, default: 0
    add_column :users, :last_study_date, :date
  end
end
