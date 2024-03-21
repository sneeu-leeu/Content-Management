class Folder < ApplicationRecord
    belongs_to :parent, class_name: 'Folder', optional: true
    has_many :sub_folders, class_name: 'Folder', foreign_key: :parent_id, dependent: :destroy
    has_many :uploads, as: :uploadable, dependent: :destroy
    belongs_to :user
    
    before_destroy :destroy_uploads

    private
    def destroy_uploads
        upload.each do |upload|
        upload.destroy
        end
    end
end
