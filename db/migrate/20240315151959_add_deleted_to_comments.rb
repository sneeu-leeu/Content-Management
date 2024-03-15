class AddDeletedToComments < ActiveRecord::Migration[7.1]
  def change
    add_column :comments, :deleted, :boolean, default: false
  end
end
