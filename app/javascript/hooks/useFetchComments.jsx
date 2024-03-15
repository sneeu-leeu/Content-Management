import { useState, useEffect } from 'react';

const useFetchComments = (folderId, uploadId) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/v1/folders/${folderId}/uploads/${uploadId}/comments`, {
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setComments(data);
      } catch (error) {
        console.error("Failed to fetch comments:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (folderId && uploadId) {
      fetchComments();
    }
  }, [folderId, uploadId]);

  return { comments, loading, error };
};

export default useFetchComments;