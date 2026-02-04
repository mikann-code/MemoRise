class AddOrderIndexToWordbooks < ActiveRecord::Migration[8.1]
  def change
    add_column :wordbooks, :order_index, :integer, null: false, default: 0
    add_index :wordbooks, [:parent_id, :order_index]
  end
end
