class CreateComments < ActiveRecord::Migration[7.1]
  def change
    create_table :comments do |t|
      t.string :body
      t.references :commentable, polymorphic: true, null: false
      t.references :parent, null: true, foreign_key: { to_table: :comments }, index: true
      t.references :upload, null: true, foreign_key: true
      t.boolean :hidden
      t.boolean :done

      t.timestamps
    end
  end
end
