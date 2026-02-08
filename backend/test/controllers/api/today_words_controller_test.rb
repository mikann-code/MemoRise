require "test_helper"

class Api::TodayWordsControllerTest < ActionDispatch::IntegrationTest
  test "should get show" do
    get api_today_words_show_url
    assert_response :success
  end
end
