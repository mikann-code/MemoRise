require "test_helper"

class Api::Admin::AuthControllerTest < ActionDispatch::IntegrationTest
  test "should get login" do
    get api_admin_auth_login_url
    assert_response :success
  end
end
