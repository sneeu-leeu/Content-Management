import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import useUploads from '../hooks/useUploads';

const UploadModal = ({ show, handleClose, uploadableId }) => {
  const [files, setFiles] = useState([]);
  const { uploadFiles } = useUploads();
  const onDrop = acceptedFiles => setFiles(prevFiles => [...prevFiles, ...acceptedFiles]);
  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await uploadFiles(files, uploadableId);
    handleClose();
  };

  const modalHeader = (
    <div className="modal-header">
      <h5 className="modal-title">Upload File(s)</h5>
    </div>
  );

  const dropzone = (
    <div {...getRootProps()} className="dropzone border rounded d-flex justify-content-center align-items-center p-3">
      <input {...getInputProps()} />
      <p>Drag 'n' drop files here, or click to select files</p>
    </div>
  );

  const fileList = (
    <ul className="list-unstyled mt-2">
      {files.map((file, index) => (
        <li key={index}>{file.name} - {file.size} bytes</li>
      ))}
    </ul>
  );

  const modalFooter = (
    <div className="modal-footer">
      <button type="button" className="btn custom-button" onClick={handleClose}>Close</button>
      <button type="submit" className="btn custom-button">Upload</button>
    </div>
  );

  return (
    <div className={`modal ${show ? 'show' : ''}`} style={{ display: show ? 'block' : 'none' }} tabIndex="-1" role="dialog">
      <div className="modal-dialog">
        <div className="modal-content">
          {modalHeader}
          <form onSubmit={handleSubmit}>
            <div className="modal-body">
              {dropzone}
              {fileList}
            </div>
            {modalFooter}
          </form>
        </div>
      </div>
    </div>
  );
};

export default UploadModal;