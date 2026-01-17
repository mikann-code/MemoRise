require "test_helper"

class Admin::WordsControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get admin_words_index_url
    assert_response :success
  end

  test "should get show" do
    get admin_words_show_url
    assert_response :success
  end

  test "should get create" do
    get admin_words_create_url
    assert_response :success
  end

  test "should get update" do
    get admin_words_update_url
    assert_response :success
  end

  test "should get destroy" do
    get admin_words_destroy_url
    assert_response :success
  end
end
