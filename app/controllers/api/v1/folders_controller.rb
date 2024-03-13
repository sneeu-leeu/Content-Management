class Api::V1::FoldersController < ApplicationController
    before_action :set_folder, only: %i[show destroy]

    def index
        folder = Folder.all
        render json: folder
    end

    def create
        folder = Folder.create!(folder_params)
        if folder
            render json: folder
        else
            render json: folder.errors
        end
    end

    def show
        render json: { folder: @folder, sub_folders: @folder.sub_folders }
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
