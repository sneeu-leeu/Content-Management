import React from 'react';
import { useParams, useLocation } from 'react-router-dom';
import useFetchUploadDetails from '../hooks/useFetchUploadDetails';
import useCommentSubmission from '../hooks/useCommentSubmission';
import useFetchComments from '../hooks/useFetchComments';
import useReplySubmission from '../hooks/useReplySubmission';
import useCommentEdit from '../hooks/useCommentEdit';

const UploadView = () => {
  const { uploadId } = useParams();
  const location = useLocation();
  const folderId = location.state?.folderId;

  const { uploadDetails, loading: uploadLoading, error: uploadError } = useFetchUploadDetails(uploadId, folderId);
  const { commentBody, setCommentBody, handleCommentSubmit } = useCommentSubmission(folderId, uploadId);
  const { comments, loading: commentsLoading, error: commentsError } = useFetchComments(folderId, uploadId);
  const { replyBody, setReplyBody, handleReplySubmit, replyFormVisible, toggleReplyForm } = useReplySubmission(folderId, uploadId);
  const { editCommentId, editCommentBody, handleEditChange, startEdit, cancelEdit, submitEdit } = useCommentEdit(uploadId, folderId);
  
  if (uploadLoading || commentsLoading) return <div>Loading...</div>;
  if (uploadError || commentsError) return <div>Error: {uploadError || commentsError}</div>;
  if (!uploadDetails || !uploadDetails.file || !uploadDetails.file.url) return <div>File details are missing.</div>;


  const renderMedia = () => {
    const isVideo = uploadDetails.file.content_type && uploadDetails.file.content_type.startsWith('video');
    return isVideo ? (
      <video controls src={uploadDetails.file.url} className="img-fluid mb-3" />
    ) : (
      <img src={uploadDetails.file.url} alt={uploadDetails.title || 'Uploaded file'} className="img-fluid mb-3" />
    );
  };

  const renderCommentForm = () => (
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
  );

  const renderComments = () => (
    <div className="comments-section">
      <h5>Comments</h5>
      {comments.length > 0 ? (
        comments.map(comment => (
          <div key={comment.id} className="border p-3 mb-2">
            {renderComment(comment)}
          </div>
        ))
      ) : (
        <p>No comments yet.</p>
      )}
    </div>
  );

  const renderComment = (comment) => {
    if (editCommentId === comment.id) {
      return renderEditCommentForm(comment);
    } else {
      return (
        <>
          <p>{comment.body}</p>
          <button onClick={() => startEdit(comment.id, comment.body)} className="btn btn-link">Edit</button> {/* Corrected to startEdit */}
          <button onClick={() => toggleReplyForm(comment.id)} className="btn btn-link">Reply</button>
          {replyFormVisible[comment.id] && renderReply(comment.id)}
          {comment.replies && comment.replies.map(renderReply)}
        </>
      );
    }
  };
  
  const renderEditCommentForm = (comment) => (
    <form onSubmit={(e) => submitEdit(e, comment.id)}>
      <textarea
        className="form-control"
        value={editCommentBody}
        onChange={(e) => handleEditChange(e)} 
        required
      ></textarea>
      <div className="mt-2">
        <button type="submit" className="btn btn-primary">Save</button>
        <button onClick={cancelEdit} type="button" className="btn btn-secondary ml-2">Cancel</button>
      </div>
    </form>
  );

  const renderReply = (reply) => (
    <div key={reply.id} className="border mt-2 p-2" style={{ marginLeft: '20px', background: '#f8f9fa' }}>
      <p>{reply.body}</p>
    </div>
  );

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6">
          {renderMedia()}
          {renderCommentForm()}
        </div>
        <div className="col-md-6">
          {renderComments()}
        </div>
      </div>
    </div>
  );
};

export default UploadView;