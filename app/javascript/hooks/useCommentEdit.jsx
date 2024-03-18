import { useState } from 'react';

const useCommentEdit = (uploadId, folderId, reloadComments) => {
  const [editCommentId, setEditCommentId] = useState(null);
  const [editCommentBody, setEditCommentBody] = useState('');

  const handleEditChange = (e) => {
    setEditCommentBody(e.target.value);
  };

  const startEdit = (commentId, currentBody) => {
    setEditCommentId(commentId);
    setEditCommentBody(currentBody);
  };

  const cancelEdit = () => {
    setEditCommentId(null);
    setEditCommentBody('');
  };

  const submitEdit = async (e, commentId) => {
    e.preventDefault();
    console.log('commnetId', commentId)
    try {
      const response = await fetch(`/api/v1/folders/${folderId}/uploads/${uploadId}/comments/${commentId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ body: editCommentBody }),
      });
      if (!response.ok) {
        throw new Error('Failed to edit comment');
      }
      cancelEdit();
      reloadComments();
    } catch (error) {
      console.error('Failed to edit comment:', error);
    }
  };

  return {
    editCommentId,
    editCommentBody,
    handleEditChange,
    startEdit,
    cancelEdit,
    submitEdit,
  };
};

export default useCommentEdit;