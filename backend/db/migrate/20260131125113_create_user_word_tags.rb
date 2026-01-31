class CreateUserWordTags < ActiveRecord::Migration[8.1]
  def change
    create_table :user_word_tags do |t|
      t.references :user, null: false, foreign_key: true
      t.references :word, null: false, foreign_key: true
      t.string :tag, null: false

      t.timestamps
    end

    add_index :user_word_tags, [:user_id, :word_id, :tag], unique: true
  end
end
