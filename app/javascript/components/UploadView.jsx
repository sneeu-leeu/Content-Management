import React from 'react';
import { useParams, useLocation } from 'react-router-dom';
import useFetchUploadDetails from '../hooks/useFetchUploadDetails';
import useCommentSubmission from '../hooks/useCommentSubmission';
import useFetchComments from '../hooks/useFetchComments'; // Import the new hook

const UploadView = () => {
  const { uploadId } = useParams();
  const location = useLocation();
  const folderId = location.state?.folderId;

  const { uploadDetails, loading: uploadLoading, error: uploadError } = useFetchUploadDetails(uploadId, folderId);
  const { commentBody, setCommentBody, handleCommentSubmit } = useCommentSubmission(folderId, uploadId);
  const { comments, loading: commentsLoading, error: commentsError } = useFetchComments(folderId, uploadId); // Use the hook

  if (uploadLoading || commentsLoading) return <div>Loading...</div>;
  if (uploadError || commentsError) return <div>Error: {uploadError || commentsError}</div>;
  if (!uploadDetails || !uploadDetails.file || !uploadDetails.file.url) return <div>File details are missing.</div>;

  const isVideo = uploadDetails.file.content_type && uploadDetails.file.content_type.startsWith('video');
  const videoUrl = uploadDetails && uploadDetails.file && uploadDetails.file.url;

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6">
          {isVideo ? (
            <video controls src={videoUrl} className="img-fluid mb-3" />
          ) : (
            <img src={uploadDetails.file.url} alt={uploadDetails.title || 'Uploaded file'} className="img-fluid mb-3" />
          )}
          <div className="comment-form mt-4">
            <h5>Post a New Comment</h5>
            <form onSubmit={handleCommentSubmit}>
              <div className="form-group">
                <textarea
                  className="form-control"
                  id="commentBody"
                  placeholder="Your comment here..."
                  value={commentBody}
                  onChange={(e) => setCommentBody(e.target.value)}
                  required
                ></textarea>
              </div>
              <button type="submit" className="btn btn-primary mt-2">Submit</button>
            </form>
          </div>
        </div>
        <div className="col-md-6">
          <div className="comments-section">
            <h5>Comments</h5>
            {comments.length > 0 ? (
              comments.map(comment => (
                <div key={comment.id} className="border p-3 mb-2">
                  <p>{comment.body}</p>
                  {comment.replies && comment.replies.map(reply => (
                    <div key={reply.id} className="border mt-2 p-2" style={{ marginLeft: '20px', background: '#f8f9fa' }}>
                      <p>{reply.body}</p>
                    </div>
                  ))}
                </div>
              ))
            ) : (
              <p>No comments yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadView;