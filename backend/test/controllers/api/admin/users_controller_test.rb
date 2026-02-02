require "test_helper"

class Api::Admin::UsersControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get api_admin_users_index_url
    assert_response :success
  end
end
