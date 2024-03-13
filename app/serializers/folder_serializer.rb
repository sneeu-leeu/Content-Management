class FolderSerializer < ActiveModel::Serializer
    attributes :id, :title, :parent_id, :created_at, :updated_at
end