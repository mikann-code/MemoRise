class ChangeUserIdNullOnWordbooks < ActiveRecord::Migration[8.1]
   def change
    change_column_null :wordbooks, :user_id, true
   end
end
