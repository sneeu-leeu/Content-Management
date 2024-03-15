class ModifyUploadsForPolymorphicAssociation < ActiveRecord::Migration[7.1]
  def change
    add_reference :uploads, :uploadable, polymorphic: true, index: true
  end
end
