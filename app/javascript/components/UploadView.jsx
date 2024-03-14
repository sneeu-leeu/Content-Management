import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';

const UploadView = () => {
  const { uploadId } = useParams();
  const location = useLocation();
  const folderId = location.state?.folderId;
  const [uploadDetails, setUploadDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!folderId) {
      console.error("Folder ID is missing");
      setError("Folder ID is missing");
      setLoading(false);
      return; 
    }
    fetch(`/api/v1/folders/${folderId}/uploads/${uploadId}`, {
        headers: { 'Content-Type': 'application/json' },
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setUploadDetails(data);
      })
      .catch(error => {
        console.error('Failed to fetch upload details:', error);
        setError("Failed to fetch upload details");
      })
      .finally(() => setLoading(false));
    }, [uploadId, folderId]);
  
    if (loading) {
      return <div>Loading...</div>;
    }

    if (error) {
      return <div>Error: {error}</div>;
    }


    if (!uploadDetails || !uploadDetails.file || !uploadDetails.file.url) {
      return <div>File details are missing.</div>;
    }

    const isVideo = uploadDetails.file.contentType && uploadDetails.file.contentType.startsWith('video');

    return (
      <div>
        {isVideo ? (
          <video controls src={uploadDetails.file.url} style={{ maxWidth: '100%' }} />
        ) : (
          <img src={uploadDetails.file.url} alt={uploadDetails.title || 'Uploaded file'} style={{ maxWidth: '100%' }} />
        )}
      </div>
    );
};

export default UploadView;
