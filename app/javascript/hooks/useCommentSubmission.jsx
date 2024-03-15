import { useState } from 'react';

const useCommentSubmission = (folderId, uploadId, initialCommentBody = '') => {
    const [commentBody, setCommentBody] = useState(initialCommentBody);
  
    const handleCommentSubmit = async (e) => {
      e.preventDefault();
      const csrfToken = document.querySelector("[name='csrf-token']").getAttribute("content");
      const formData = { body: commentBody };
  
      try {
        await fetch(`/api/v1/folders/${folderId}/uploads/${uploadId}/comments`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-CSRF-Token': csrfToken,
          },
          body: JSON.stringify({ comment: formData }),
          credentials: 'include',
        });
        setCommentBody(''); 
      } catch (error) {
        console.error('Error posting comment:', error);
      }
    };
  
    return { commentBody, setCommentBody, handleCommentSubmit };
  };

  export default useCommentSubmission;