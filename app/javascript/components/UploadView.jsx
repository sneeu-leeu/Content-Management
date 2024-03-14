import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const UploadView = () => {
  const { uploadId } = useParams();
  const [uploadDetails, setUploadDetails] = useState(null);

  useEffect(() => {
    fetch(`/api/v1/uploads/${uploadId}`)
      .then((response) => {
        if(!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setUploadDetails(data);
      })
      .catch((error) => console.error('Failed to fetch upload details:', error));
  }, [uploadId]);

  if (!uploadDetails) {
    return <div>Loading...</div>;
  }

  // Determine if the upload is a video or an image based on MIME type
  const isVideo = uploadDetails.file.contentType.startsWith('video');

  return (
    <div>
      {isVideo ? (
        <video controls src={uploadDetails.file.url} style={{ maxWidth: '100%' }} />
      ) : (
        <img src={uploadDetails.file.url} alt={uploadDetails.title} style={{ maxWidth: '100%' }} />
      )}
    </div>
  );
};

export default UploadView;