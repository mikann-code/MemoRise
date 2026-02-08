require "test_helper"

class Api::V1::TodayWordsControllerTest < ActionDispatch::IntegrationTest
  test "should get show" do
    get api_v1_today_words_show_url
    assert_response :success
  end
end
