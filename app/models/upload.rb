class Upload < ApplicationRecord
    belongs_to :uploadable, polymorphic: true
    has_one_attached :file 

    def file_size
        file.blob.byte_size
    end
end