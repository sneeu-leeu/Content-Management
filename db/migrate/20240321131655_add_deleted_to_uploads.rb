class AddDeletedToUploads < ActiveRecord::Migration[7.1]
  def change
    add_column :uploads, :deleted, :boolean, default: false
  end
end
