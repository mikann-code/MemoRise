require "test_helper"

class Api::Admin::StatsControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get api_admin_stats_index_url
    assert_response :success
  end
end
