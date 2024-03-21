class Api::V1::FoldersController < ApplicationController
    before_action :set_folder, only: %i[show destroy]

    def index
        folder = Folder.all
        render json: folder
    end

    def create
        folder = current_user.folders.new(folder_params)
        if folder.save
          render json: folder, status: :created
        else
          render json: folder.errors, status: :unprocessable_entity
        end
    end

    def show
        render json: { folder: @folder, sub_folders: @folder.sub_folders, user: @folder.user }
    end
    
    def destroy
        parent_folder = @folder.parent
        @folder&.destroy
        render json: { message: 'Folder deleted!' }
    end

    private

    def folder_params
        params.require(:folder).permit(:title, :parent_id)
    end

    def set_folder
        @folder = Folder.find(params[:id])
    end
end
