class JokesController < ApplicationController
  before_action :set_joke, only: [:show, :update, :destroy]

  # GET /jokes
  def index
    @jokes = Joke.all
    @tags = Tag.all

    render json: @jokes, include: :tags
  end

  # GET /jokes/1
  def show
    render json: @joke
  end

  # POST /jokes
  def create
    @joke = Joke.new(joke_params)

    if @joke.save
      render json: @joke, status: :created, location: @joke
    else
      render json: @joke.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /jokes/1
  def update
    if @joke.update(joke_params)
      render json: @joke, status: :created, location: @joke
    else
      render json: @joke.errors, status: :unprocessable_entity
    end
  end

  # DELETE /jokes/1
  def destroy
    @joke.destroy

    render json: @joke 
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_joke
      @joke = Joke.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def joke_params
      params.require(:joke).permit( :content, :tag_ids => [] )
    end
end
