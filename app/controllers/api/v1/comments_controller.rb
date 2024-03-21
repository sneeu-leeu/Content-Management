class Api::V1::CommentsController < ApplicationController
  before_action :set_upload
  before_action :set_comment, only: [:update]

  def index
    @comments = @upload.comments.includes(:replies, :user).order(created_at: :desc).where(upload_id: params[:upload_id], deleted: false)
    render json: @comments.as_json(include: [{replies: {include: :user}}, :user])
  end

  def create
    @comment = @upload.comments.new(comment_params.merge(user: current_user))
    if @comment.save
      render json: @comment, status: :created
    else
      render json: @comment.errors, status: :unprocessable_entity
    end
  end

  def update
    if @comment.update(comment_params)
      render json: @comment.as_json(include: :user)
    else
      render json: @comment.errors, status: :unprocessable_entity
    end
  end

  def soft_delete
    comment = Comment.find(params[:id])
    comment.update(deleted: true)
    head :no_content
  end

  private

  def set_upload
    @upload = Upload.find(params[:upload_id])
  end
  
  def set_comment
    @comment = Comment.find(params[:id])
  end

  def comment_params
    params.require(:comment).permit(:body)
  end
end