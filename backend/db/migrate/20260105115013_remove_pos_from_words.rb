class RemovePosFromWords < ActiveRecord::Migration[8.1]
  def change
    remove_column :words, :pos, :string
  end
end
