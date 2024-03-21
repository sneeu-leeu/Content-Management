class Api::V1::RepliesController < ApplicationController
  before_action :set_comment

  def index
    @replies = @comment.replies.order(created_at: :desc).includes(:user)
    render json: @replies.as_json(include: :user)
  end  

  def create
    @reply = @comment.replies.new(reply_params.merge(user: current_user))
    if @reply.save
      render json: @reply.as_json(include: :user), status: :created
    else
      render json: @reply.errors, status: :unprocessable_entity
    end
  end
  
  def update
    if @reply.update(reply_params)
      render json: @reply.as_json(include: :user)
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