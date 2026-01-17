class AddDefaultToRole < ActiveRecord::Migration[8.1]
  # デフォルトで"user"を設定
  def change
    change_column :users, :role, :string, default: "user", null: false
  end
end
