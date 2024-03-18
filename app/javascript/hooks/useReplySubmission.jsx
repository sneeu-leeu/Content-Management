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
  setReplyFormVisible(currentState => {
    const newState = { ...currentState };
    const currentStateOfForm = newState[commentId];
    // Reset all to false
    Object.keys(newState).forEach(key => newState[key] = false);
    // Toggle the current form
    newState[commentId] = !currentStateOfForm;
    return newState;
  });
  };

  return { replyBody, setReplyBody, handleReplySubmit, replyFormVisible, toggleReplyForm };
};

export default useReplySubmission;
