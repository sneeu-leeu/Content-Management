class Upload < ApplicationRecord
    belongs_to :uploadable, polymorphic: true
    has_one_attached :file 
end