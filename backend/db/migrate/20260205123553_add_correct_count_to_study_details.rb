class AddCorrectCountToStudyDetails < ActiveRecord::Migration[8.1]
  def change
    add_column :study_details, :correct_count, :integer, null: false, default: 0
  end
end
