class CreateStudyRecords < ActiveRecord::Migration[8.1]
  def change
    create_table :study_records do |t|
      t.references :user, null: false, foreign_key: true
      t.date :study_date, null: false
      t.integer :study_count, null: false, default: 0
      t.text :memo

      t.timestamps
    end

    # ユーザーと日付の紐付け、一日一回の制約
    add_index :study_records, [ :user_id, :study_date ], unique: true
  end
end
