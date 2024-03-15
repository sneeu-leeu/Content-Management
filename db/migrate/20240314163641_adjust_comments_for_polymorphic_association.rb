class AdjustCommentsForPolymorphicAssociation < ActiveRecord::Migration[7.1]
  def change
    remove_column :comments, :upload_id, :bigint
  end
end
