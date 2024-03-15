import { useContext } from 'react';

const useSoftDeleteComment = () => {

  const softDeleteComment = async (folderId, uploadId, commentId) => {
    try {
      const response = await fetch(`/api/v1/folders/${folderId}/uploads/${uploadId}/comments/${commentId}/soft_delete`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Failed to soft delete the comment');
      }
      return true;
    } catch (error) {
      console.error('Failed to soft delete comment:', error);
      return false;
    }
  };

  return softDeleteComment;
};

export default useSoftDeleteComment;