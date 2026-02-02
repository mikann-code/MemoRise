class RemoveFkFromWords < ActiveRecord::Migration[8.1]
  def change
    remove_foreign_key :words, :users
  end
end
