require "test_helper"

class Api::V1::StudyRecordsControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get api_v1_study_records_index_url
    assert_response :success
  end

  test "should get create" do
    get api_v1_study_records_create_url
    assert_response :success
  end

  test "should get update" do
    get api_v1_study_records_update_url
    assert_response :success
  end
end
