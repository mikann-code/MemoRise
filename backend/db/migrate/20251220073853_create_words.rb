class CreateWords < ActiveRecord::Migration[8.1]
  def change
    create_table :words do |t|
      t.string :uuid, null: false
      t.string :question, null: false
      t.string :answer, null: false
      t.boolean :review, null: false, default: false
      t.references :wordbook, null: false, foreign_key: true

      t.timestamps
    end

    add_index :words, :uuid, unique: true
  end
end
