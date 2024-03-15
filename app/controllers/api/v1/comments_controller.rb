class Api::V1::CommentsController < ApplicationController
  before_action :set_upload
  before_action :set_comment, only: [:update]

  def index
    @comments = @upload.comments.includes(:replies).order(created_at: :desc)
    render json: @comments, include: [:replies]
  end

  def create
    @comment = @upload.comments.new(comment_params)
    if @comment.save
      render json: @comment, status: :created
    else
      render json: @comment.errors, status: :unprocessable_entity
    end
  end

  def update
    @comment = @upload.comments.find(params[:id])
    if @comment.update(comment_params)
      render json: @comment
    else
      render json: @comment.errors, status: :unprocessable_entity
    end
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