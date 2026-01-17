require "test_helper"

class Admin::WordbooksControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get admin_wordbooks_index_url
    assert_response :success
  end

  test "should get show" do
    get admin_wordbooks_show_url
    assert_response :success
  end

  test "should get create" do
    get admin_wordbooks_create_url
    assert_response :success
  end

  test "should get update" do
    get admin_wordbooks_update_url
    assert_response :success
  end

  test "should get destroy" do
    get admin_wordbooks_destroy_url
    assert_response :success
  end
end
