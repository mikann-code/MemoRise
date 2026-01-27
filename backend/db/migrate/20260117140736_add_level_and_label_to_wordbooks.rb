class AddLevelAndLabelToWordbooks < ActiveRecord::Migration[8.1]
  def change
    add_column :wordbooks, :level, :string
    add_column :wordbooks, :label, :string
  end
end
