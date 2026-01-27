# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[8.1].define(version: 2026_01_27_032204) do
  create_table "admin_users", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.string "email"
    t.string "password_digest"
    t.datetime "updated_at", null: false
  end

  create_table "study_records", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.text "memo"
    t.integer "study_count", default: 0, null: false
    t.date "study_date", null: false
    t.datetime "updated_at", null: false
    t.bigint "user_id", null: false
    t.index ["user_id", "study_date"], name: "index_study_records_on_user_id_and_study_date", unique: true
    t.index ["user_id"], name: "index_study_records_on_user_id"
  end

  create_table "users", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.string "email"
    t.date "last_study_date"
    t.string "name"
    t.string "password_digest"
    t.string "role", default: "user", null: false
    t.integer "streak", default: 0, null: false
    t.datetime "updated_at", null: false
  end

  create_table "wordbooks", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.text "description"
    t.boolean "is_official", default: false, null: false
    t.string "label"
    t.datetime "last_studied"
    t.string "level"
    t.bigint "parent_id"
    t.string "part"
    t.string "title", null: false
    t.datetime "updated_at", null: false
    t.bigint "user_id"
    t.string "uuid", null: false
    t.integer "words_count", default: 0, null: false
    t.index ["parent_id", "part"], name: "index_wordbooks_on_parent_id_and_part", unique: true
    t.index ["parent_id"], name: "index_wordbooks_on_parent_id"
    t.index ["user_id"], name: "index_wordbooks_on_user_id"
    t.index ["uuid"], name: "index_wordbooks_on_uuid", unique: true
  end

  create_table "words", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.string "answer", null: false
    t.datetime "created_at", null: false
    t.string "question", null: false
    t.boolean "review", default: false, null: false
    t.datetime "updated_at", null: false
    t.string "uuid", null: false
    t.bigint "wordbook_id", null: false
    t.index ["uuid"], name: "index_words_on_uuid", unique: true
    t.index ["wordbook_id"], name: "index_words_on_wordbook_id"
  end

  add_foreign_key "study_records", "users"
  add_foreign_key "wordbooks", "users"
  add_foreign_key "words", "wordbooks"
end
