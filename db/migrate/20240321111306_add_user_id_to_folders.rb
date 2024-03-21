class AddUserIdToFolders < ActiveRecord::Migration[7.1]
  def change
    add_reference :folders, :user, null: false, foreign_key: true
  end
end
