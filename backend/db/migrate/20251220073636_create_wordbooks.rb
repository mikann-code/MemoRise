class CreateWordbooks < ActiveRecord::Migration[8.1]
  def change
    create_table :wordbooks do |t|
      t.string :uuid, null: false
      t.string :title, null: false
      t.text :description
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end

    add_index :wordbooks, :uuid, unique: true
  end
end
