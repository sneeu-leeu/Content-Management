class Api::V1::CommentsController < ApplicationController
  before_action :set_commentable

  def index
    @comments = @commentable.comments.includes(:replies).order(created_at: :desc)
    render json: @comments, include: [:replies]
  end

  def create
    @comment = @commentable.comments.new(comment_params)
    if @comment.save
      render json: @comment, status: :created, location: api_v1_folder_upload_comments_url(params[:folder_id], params[:upload_id])
    else
      render json: @comment.errors, status: :unprocessable_entity
    end
  end

  private

  def set_commentable
    @commentable = Upload.find(params[:upload_id])
  end

  def comment_params
    params.require(:comment).permit(:body, :parent_id)
  end
end