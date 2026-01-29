class AddUniqueIndexToWordbooksOnParentIdAndPart < ActiveRecord::Migration[8.1]
  def change
     add_index :wordbooks, [ :parent_id, :part ], unique: true
  end
end
