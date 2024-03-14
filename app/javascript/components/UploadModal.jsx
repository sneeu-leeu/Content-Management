import React, { useState } from 'react';

const UploadModal = ({ show, handleClose }) => {
    const [title, setTitle] = useState('');
    const [file, setFile] = useState(null);

    const handleSubmit = (e) => {
        console.log('Submit button clicked');
        e.preventDefault();

        const formData = new FormData();
        formData.append('upload[title]', title);
        formData.append('upload[uploadable_type]', 'Folder');
        formData.append('upload[uploadable_id]', uploadableId);

          fetch(`/api/v1/folders/${uploadableId}/uploads`, {
            method: 'POST',
            body: formData,
        })
        .then(response => {
            if (!response.ok) throw new Error('Network response was not ok.');
            return response.json();
        })
        .then(() => {
            handleClose();
            window.location.reload(); // REMEMBER TO CHANGE THIS
        })
        .catch(error => {
            console.error('Error:', error);
        });
    };

    return (
        <div className={`modal fade ${show ? 'show' : ''}`} style={{ display: show ? 'block' : 'none' }} tabIndex="-1" role="dialog">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Upload File</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={handleClose}>
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="modal-body">
                            <div className="form-group">
                                <label htmlFor="uploadTitle">Title</label>
                                <input type="text" className="form-control" id="uploadTitle" value={title} onChange={(e) => setTitle(e.target.value)} required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="uploadFile">File</label>
                                <input type="file" className="form-control" id="uploadFile" onChange={(e) => setFile(e.target.files[0])} required />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={handleClose}>Close</button>
                            <button type="submit" className="btn btn-primary">Upload</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default UploadModal;