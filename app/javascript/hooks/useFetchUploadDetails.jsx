import { useState, useEffect } from 'react';


const useFetchUploadDetails = (uploadId, folderId) => {
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
  
      const fetchData = async () => {
        try {
          const response = await fetch(`/api/v1/folders/${folderId}/uploads/${uploadId}`, {
            headers: { 'Content-Type': 'application/json' },
          });
          if (!response.ok) throw new Error('Network response was not ok');
          const data = await response.json();
          setUploadDetails(data);
        } catch (error) {
          console.error('Failed to fetch upload details:', error);
          setError("Failed to fetch upload details");
        } finally {
          setLoading(false);
        }
      };
  
      fetchData();
    }, [uploadId, folderId]);
  
    return { uploadDetails, loading, error };
  };

  export default useFetchUploadDetails;