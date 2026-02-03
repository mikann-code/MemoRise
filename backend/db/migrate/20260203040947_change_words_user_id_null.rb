class ChangeWordsUserIdNull < ActiveRecord::Migration[8.1]
  def change
    change_column_null :words, :user_id, true
  end
end
