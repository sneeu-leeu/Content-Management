class Api::V1::CommentsController < ApplicationController
    before_action :set_commentable
  
    def create
      @comment = @commentable.comments.new(comment_params)
      if @comment.save
        render json: @comment, status: :created
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