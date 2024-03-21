class AddCommentIdToReplies < ActiveRecord::Migration[7.1]
  def change
    add_reference :replies, :comment, null: false, foreign_key: true
  end
end
