import { useState, useEffect } from 'react';

const useFetchComments = (folderId, uploadId) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    reloadComments();
  }, [folderId, uploadId]);

  const reloadComments = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/v1/folders/${folderId}/uploads/${uploadId}/comments`);
      if (!response.ok) throw new Error('Failed to load comments');
      const data = await response.json();
      setComments(data);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  return { comments, loading, error, reloadComments };
};

export default useFetchComments;