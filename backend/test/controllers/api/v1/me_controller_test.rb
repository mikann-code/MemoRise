require "test_helper"

class Api::V1::MeControllerTest < ActionDispatch::IntegrationTest
  test "should get update" do
    get api_v1_me_update_url
    assert_response :success
  end
end
