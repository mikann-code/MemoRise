class AddPartToWordbooks < ActiveRecord::Migration[8.1]
  def change
    add_column :wordbooks, :part, :string
  end
end
