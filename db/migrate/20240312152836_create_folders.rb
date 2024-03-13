class CreateFolders < ActiveRecord::Migration[7.1]
  def change
    create_table :folders do |t|
      t.string :title
      t.text :description
      t.boolean :active
      t.references :parent, foreign_key: { to_table: :folders }
      t.boolean :archive
      t.string :version
      t.string :timestamp

      t.timestamps
    end
  end
end
