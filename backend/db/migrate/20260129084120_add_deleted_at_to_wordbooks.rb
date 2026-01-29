class AddDeletedAtToWordbooks < ActiveRecord::Migration[8.1]
  def change
    add_column :wordbooks, :deleted_at, :datetime
    add_index  :wordbooks, :deleted_at
  end
end
