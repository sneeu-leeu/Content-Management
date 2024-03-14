import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';

const UploadView = () => {
  const { uploadId } = useParams();
  const location = useLocation();
  const folderId = location.state?.folderId;
  const [uploadDetails, setUploadDetails] = useState(null);
  const [comments, setComments] = useState([]);
  const [commentBody, setCommentBody] = useState('');
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

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    const csrfToken = document.querySelector("[name='csrf-token']").getAttribute("content");
    const formData = { body: commentBody };
  
    // Adjusting the URL to match the nested route for comments
    // No longer explicitly sending folder_id or upload_id within the body, as they are part of the URL
    try {
      const response = await fetch(`/api/v1/folders/${folderId}/uploads/${uploadId}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-Token': csrfToken,
        },
        body: JSON.stringify({ comment: formData }),
        credentials: 'include',
      });
      if (!response.ok) throw new Error('Failed to post comment');
      const newComment = await response.json();
      setComments([...comments, newComment]);
      setCommentBody('');
    } catch (error) {
      console.error('Error posting comment:', error);
    }
  };


  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!uploadDetails || !uploadDetails.file || !uploadDetails.file.url) return <div>File details are missing.</div>;

  const isVideo = uploadDetails.file.contentType && uploadDetails.file.contentType.startsWith('video');

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-4">
          {isVideo ? (
            <video controls src={uploadDetails.file.url} className="img-fluid" />
          ) : (
            <img src={uploadDetails.file.url} alt={uploadDetails.title || 'Uploaded file'} className="img-fluid" />
          )}
        </div>
        <div className="col-md-4">
          <form onSubmit={handleCommentSubmit}>
            <div className="form-group">
              <label htmlFor="commentBody">New Comment</label>
              <textarea
                className="form-control"
                id="commentBody"
                value={commentBody}
                onChange={(e) => setCommentBody(e.target.value)}
                required
              ></textarea>
            </div>
            <button type="submit" className="btn btn-primary">Post Comment</button>
          </form>
        </div>
        <div className="col-md-4">
          {/* Comments display placeholder */}
          {comments.map(comment => (
            <div key={comment.id} className="comment">
              {comment.body}

            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UploadView;