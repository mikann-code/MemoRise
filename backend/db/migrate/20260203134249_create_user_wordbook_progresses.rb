class CreateUserWordbookProgresses < ActiveRecord::Migration[8.1]
  def change
    create_table :user_wordbook_progresses do |t|
      t.references :user, null: false, foreign_key: true

      # 子単語帳（実体は wordbooks テーブル）
      t.references :wordbook, null: false, foreign_key: { to_table: :wordbooks }

      t.boolean :completed, null: false, default: false

      t.timestamps
    end

    # 同じ user × wordbook を2回入れられないようにする
    add_index :user_wordbook_progresses, [:user_id, :wordbook_id], unique: true
  end
end
