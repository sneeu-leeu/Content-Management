import { useState } from 'react';

const useReplySubmission = (folderId, uploadId, reloadComments) => {
  const [replyBody, setReplyBody] = useState('');
  const [replyFormVisible, setReplyFormVisible] = useState({});

  const handleReplySubmit = async (commentId, e) => {
    e.preventDefault();
    const body = replyBody[commentId] || '';
    try {
      const response = await fetch(`/api/v1/folders/${folderId}/uploads/${uploadId}/comments/${commentId}/replies`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ body }),
      });
      if (!response.ok) throw new Error('Failed to submit reply');
      setReplyBody(prev => ({ ...prev, [commentId]: '' }));
      setReplyFormVisible({});
      reloadComments();
    } catch (error) {
      console.error('Error submitting reply:', error);
    }
  };

  const toggleReplyForm = (commentId) => {
    setReplyFormVisible(currentState => {
      const newState = { ...currentState };
      newState[commentId] = !newState[commentId];
      return newState;
    });
  };

  return { replyBody, setReplyBody, handleReplySubmit, replyFormVisible, toggleReplyForm };
};

export default useReplySubmission;
