class AddWordsCountToWordbooks < ActiveRecord::Migration[8.1]
  def change
    add_column :wordbooks, :words_count, :integer, default: 0, null: false
  end
end
