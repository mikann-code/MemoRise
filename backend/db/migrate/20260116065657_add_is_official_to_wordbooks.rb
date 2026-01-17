class AddIsOfficialToWordbooks < ActiveRecord::Migration[8.1]
  # 公式の単語帳かどうかを示すフラグを追加
  def change
    add_column :wordbooks, :is_official, :boolean, default: false, null: false
  end
end
