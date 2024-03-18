import { useState } from 'react';

const useCommentSubmission = (folderId, uploadId, reloadComments) => {
  const [commentBody, setCommentBody] = useState('');

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    const csrfToken = document.querySelector("[name='csrf-token']").getAttribute("content");
    try {
      const response = await fetch(`/api/v1/folders/${folderId}/uploads/${uploadId}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-Token': csrfToken,
        },
        body: JSON.stringify({ body: commentBody }),
      });
      if (!response.ok) throw new Error('Failed to submit comment');
      setCommentBody('');
      reloadComments(); 
    } catch (error) {
      console.error('Error submitting comment:', error);
    }
  };

  return { commentBody, setCommentBody, handleCommentSubmit };
};

export default useCommentSubmission;