import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import useUploads from '../hooks/useUploads';

const UploadModal = ({ show, handleClose, uploadableId, onUploadAdded }) => {
  const [files, setFiles] = useState([]);
  const { uploadFiles } = useUploads();
  const onDrop = acceptedFiles => setFiles(prevFiles => [...prevFiles, ...acceptedFiles]);
  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await uploadFiles(files, uploadableId).then((newUploads) => {
      newUploads.forEach(newUpload => onUploadAdded(newUpload));
      handleClose();
      setFiles([]);
    });
  };

  return (
    <div className={`modal ${show ? 'show' : ''}`} style={{ display: show ? 'block' : 'none' }} tabIndex="-1" role="dialog">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Upload File(s)</h5>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="modal-body">
              <div {...getRootProps()} className="dropzone border rounded d-flex justify-content-center align-items-center p-3">
                <input {...getInputProps()} />
                <p>Drag 'n' drop files here, or click to select files</p>
              </div>
              <ul className="list-unstyled mt-2">
                {files.map((file, index) => (
                  <li key={index}>{file.name} - {file.size} bytes</li>
                ))}
              </ul>
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