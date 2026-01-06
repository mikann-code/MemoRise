class AddLastStudiedToWordbooks < ActiveRecord::Migration[8.1]
  def change
    add_column :wordbooks, :last_studied, :datetime, null: true
  end
end
