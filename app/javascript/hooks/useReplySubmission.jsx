import { useState } from 'react';

const useReplySubmission = (folderId, uploadId) => {
  const [replyBody, setReplyBodyState] = useState({});
  const [replyFormVisible, setReplyFormVisible] = useState({});

  const setReplyBody = (body, commentId) => {
    setReplyBodyState(prev => ({ ...prev, [commentId]: body }));
  };

  const toggleReplyForm = (commentId) => {
    setReplyFormVisible(prev => ({ ...prev, [commentId]: !prev[commentId] }));
  };

  const handleReplySubmit = async (e, commentId) => {
    e.preventDefault();
    const body = replyBody[commentId];
    try {
      await fetch(`/api/v1/folders/${folderId}/uploads/${uploadId}/comments/${commentId}/replies`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ body }),
      });
      // Clear the form and refresh comments or handle the state update as needed
      setReplyBodyState(prev => ({ ...prev, [commentId]: '' }));
      toggleReplyForm(commentId); // Optionally hide the form on successful submission
    } catch (error) {
      console.error('Failed to submit reply:', error);
    }
  };

  return {
    replyBody,
    setReplyBody,
    handleReplySubmit,
    replyFormVisible,
    toggleReplyForm,
  };
};

export default useReplySubmission;