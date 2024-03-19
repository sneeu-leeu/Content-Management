import { useState, useEffect } from 'react';

const useFetchComments = (folderId, uploadId) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    reloadComments();
  }, [folderId, uploadId]);

  const convertToSeconds = (timeString) => {
    const parts = timeString.split(":").map(Number);
    return parts.length === 3
      ? parts[0] * 3600 + parts[1] * 60 + parts[2]
      : parts[0] * 60 + parts[1];
  };

  const sortCommentsByTimestamp = (comments) => {
    return comments.sort((a, b) => {
      const timeRegex = /(\d{1,2}:\d{2}(?::\d{2})?)/;
      const matchA = a.body.match(timeRegex);
      const matchB = b.body.match(timeRegex);

      const secondsA = matchA ? convertToSeconds(matchA[0]) : Infinity;
      const secondsB = matchB ? convertToSeconds(matchB[0]) : Infinity;

      return secondsA - secondsB;
    });
  };

  const reloadComments = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/v1/folders/${folderId}/uploads/${uploadId}/comments`);
      if (!response.ok) throw new Error('Failed to load comments');
      let data = await response.json();
      data = sortCommentsByTimestamp(data);
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