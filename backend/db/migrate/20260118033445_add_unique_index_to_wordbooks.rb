class AddUniqueIndexToWordbooks < ActiveRecord::Migration[8.1]
  def change
    add_index :wordbooks,
              [ :label, :level, :part ],
              unique: true,
              name: "index_wordbooks_on_label_level_part"
  end
end
