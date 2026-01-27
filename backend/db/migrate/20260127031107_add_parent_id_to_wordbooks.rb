class AddParentIdToWordbooks < ActiveRecord::Migration[8.1]
  def change
    add_column :wordbooks, :parent_id, :bigint
    add_index  :wordbooks, :parent_id
  end
end
