import { useState } from 'react';

const useSoftDeleteComment = (folderId, uploadId, reloadComments) => {
  const softDeleteComment = async (commentId) => {
    try {
      const response = await fetch(`/api/v1/folders/${folderId}/uploads/${uploadId}/comments/${commentId}/soft_delete`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
      });
      if (!response.ok) throw new Error(`Failed to soft delete the comment, ${commentId}`);
      reloadComments();
    } catch (error) {
      console.error('Failed to soft delete comment:', error);
    }
  };

  return softDeleteComment;
};

export default useSoftDeleteComment;