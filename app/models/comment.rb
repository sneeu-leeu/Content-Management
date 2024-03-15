class Comment < ApplicationRecord
    belongs_to :upload
    has_many :replies, dependent: :destroy
  end
  