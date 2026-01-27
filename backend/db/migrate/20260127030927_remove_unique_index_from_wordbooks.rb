class RemoveUniqueIndexFromWordbooks < ActiveRecord::Migration[8.1]
  # ユニークインデックスを削除
  def change
    remove_index :wordbooks, name: "index_wordbooks_on_label_level_part"
  end
end
