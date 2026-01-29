class Api::Admin::WordsController < Api::Admin::BaseController
  before_action :set_wordbook
  before_action :set_word, only: [:show, :update, :destroy]

  def index
    @words = @wordbook.words.order(created_at: :desc)
    render json: @words
  end

  def show
    render json: @word
  end

  def create
    @word = @wordbook.words.new(word_params)

    if @word.save
      render json: @word, status: :created
    else
      render json: { errors: @word.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def update
    if @word.update(word_params)
      render json: @word
    else
      render json: { errors: @word.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def destroy
    @word.destroy
    head :no_content
  end

  private

  def set_wordbook
    @wordbook = Wordbook.find_by!(uuid: params[:wordbook_uuid])
  end

  def set_word
    @word = @wordbook.words.find_by!(uuid: params[:uuid])
  end

  def word_params
    params.require(:word).permit(:question, :answer, :example)
  end
end
