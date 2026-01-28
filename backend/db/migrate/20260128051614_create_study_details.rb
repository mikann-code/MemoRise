class CreateStudyDetails < ActiveRecord::Migration[8.1]
  def change
    create_table :study_details do |t|
      t.references :study_record, null: false, foreign_key: true
      t.string :title
      t.integer :rate
      t.integer :count
      t.string :children_id

      t.timestamps
    end
  end
end
