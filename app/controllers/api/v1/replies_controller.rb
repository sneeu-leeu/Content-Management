class Api::V1::RepliesController < ApplicationController
  before_action :set_comment

  def index
    @replies = @comment.replies.order(created_at: :desc)
    render json: @replies
  end

  def create
    @reply = @comment.replies.new(reply_params)
    if @reply.save
      render json: @reply, status: :created
    else
      render json: @reply.errors, status: :unprocessable_entity
    end
  end
  
  def update
    @reply = @comment.replies.find(params[:id])
    if @reply.update(reply_params)
      render json: @reply
    else
      render json: @reply.errors, status: :unprocessable_entity
    end
  end

  private

  def set_comment
    @comment = Comment.find(params[:comment_id])
  end

  def reply_params
    params.require(:reply).permit(:body)
  end
end