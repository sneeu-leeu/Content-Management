class Api::V1::UploadsController < ApplicationController

  def index
    folder = Folder.find(params[:folder_id])
    uploads = folder.uploads
    render json: uploads
  end

  def create
    upload = Upload.new(upload_params)
    upload.file.attach(params[:upload][:file]) if params[:upload][:file].present?
    
    if upload.save
      render json: upload, status: :created
    else
      render json: upload.errors, status: :unprocessable_entity
    end
  end

  def show
    upload = Upload.find(params[:id])
    render json: upload
  end

  def destroy
    upload = Upload.find(params[:id])
    upload.destroy
    render json: { message: 'Upload deleted successfully' }, status: :ok
  end

  private

  def upload_params
    params.require(:upload).permit(:title, :file, :uploadable_type, :uploadable_id)
  end

end
