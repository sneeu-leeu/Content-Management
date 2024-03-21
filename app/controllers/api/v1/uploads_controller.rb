class Api::V1::UploadsController < ApplicationController

  def index
    folder = Folder.find(params[:folder_id])
    uploads = folder.uploads.where(deleted: false)
    render json: uploads
  end

  def create
    upload = current_user.uploads.new(upload_params)
    upload.file.attach(params[:upload][:file]) if params[:upload][:file].present?
  
    if upload.save
      render json: upload, status: :created
    else
      render json: upload.errors, status: :unprocessable_entity
    end
  end

  def show
    upload = Upload.find(params[:id])
    if upload.file.attached?
      render json: {
        id: upload.id,
        title: upload.title,
        user: {
          id: upload.user.id,
        },
        file: {
          url: rails_blob_url(upload.file, only_path: true),
          content_type: upload.file.blob.content_type
        }
      }
    else
      render json: { error: "No file attached" }, status: :unprocessable_entity
    end
  end

  def destroy
    upload = Upload.find(params[:id])
    upload.destroy
    render json: { message: 'Upload deleted successfully' }, status: :ok
  end

  def update
    upload = current_user.uploads.find(params[:id])
    if upload.update(upload_params)
      render json: upload, status: :ok
    else
      render json: upload.errors, status: :unprocessable_entity
    end
  end

  private

  def upload_params
    params.require(:upload).permit(:title, :file, :uploadable_type, :uploadable_id, :deleted)
  end

end
