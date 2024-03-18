import { useState } from 'react';

const useReplySubmission = (folderId, uploadId, reloadComments) => {
  const [replyBody, setReplyBody] = useState('');
  const [replyFormVisible, setReplyFormVisible] = useState({});

  const handleReplySubmit = async (commentId, e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/v1/folders/${folderId}/uploads/${uploadId}/comments/${commentId}/replies`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ body: replyBody }),
      });
      if (!response.ok) throw new Error('Failed to submit reply');
      setReplyBody('');
      setReplyFormVisible({});
      reloadComments();
    } catch (error) {
      console.error('Error submitting reply:', error);
    }
  };

  const toggleReplyForm = (commentId) => {
    setReplyFormVisible(prevState => ({
      ...prevState,
      [commentId]: !prevState[commentId]
    }));
  };

  return { replyBody, setReplyBody, handleReplySubmit, replyFormVisible, toggleReplyForm };
};

export default useReplySubmission;