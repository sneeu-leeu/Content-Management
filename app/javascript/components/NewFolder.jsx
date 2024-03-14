import React, { useState } from 'react';

const NewFolder = ({ show, handleClose, parentId }) => {
  const [folderName, setFolderName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const csrfToken = document.querySelector("[name='csrf-token']").content;

    fetch('/api/v1/folders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-Token': csrfToken,
      },
      body: JSON.stringify({ folder: { title: folderName, parent_id: parentId } }),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Network response was not ok.');
      })
      .then(() => {
        handleClose();
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  return (
    <div className={`modal ${show ? 'show' : ''}`} tabIndex="-1" role="dialog" style={{ display: show ? 'block' : 'none' }}>
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">New Folder</h5>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="modal-body">
              <div className="form-group">
                <label htmlFor="folderName">Folder Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="folderName"
                  value={folderName}
                  onChange={(e) => setFolderName(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={handleClose}>Close</button>
              <button type="submit" className="btn btn-primary">Create Folder</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewFolder;
