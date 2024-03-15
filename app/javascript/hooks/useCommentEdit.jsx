import { useState } from 'react';

const useCommentEdit = () => {
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

  const submitEdit = async (commentId) => {
    try {
      await fetch(`/api/v1/uploads/${uploadId}/comments/${commentId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ body: editCommentBody }),
      });
      cancelEdit();
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