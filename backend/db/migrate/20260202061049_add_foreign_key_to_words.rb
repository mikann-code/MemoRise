class AddForeignKeyToWords < ActiveRecord::Migration[8.1]
  def change
     add_foreign_key :words, :users
  end
end
