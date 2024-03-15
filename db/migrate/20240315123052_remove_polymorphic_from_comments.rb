class RemovePolymorphicFromComments < ActiveRecord::Migration[7.1]
  def change
    remove_column :comments, :commentable_type
    remove_column :comments, :commentable_id
    add_reference :comments, :upload, foreign_key: true
  end
end
