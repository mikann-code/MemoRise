class ChangeIndexOnWordbooksOrderIndex < ActiveRecord::Migration[8.1]
  def change
    remove_index :wordbooks, column: [:parent_id, :order_index]

    add_index :wordbooks, [:parent_id, :order_index],
              unique: true,
              where: "parent_id IS NOT NULL"
  end
end
