import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';

const UploadModal = ({ show, handleClose, uploadableId }) => {
    const [title, setTitle] = useState('');
    const [files, setFiles] = useState([]);

    const onDrop = useCallback(acceptedFiles => {
        // Append the accepted files to the existing files array
        setFiles(prevFiles => [...prevFiles, ...acceptedFiles]);
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

    const handleSubmit = (e) => {
        e.preventDefault();
        const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

        files.forEach(file => {
            const formData = new FormData();
            formData.append('upload[title]', file.name);
            formData.append('upload[uploadable_type]', 'Folder');
            formData.append('upload[uploadable_id]', uploadableId);
            formData.append('upload[file]', file);

            fetch(`/api/v1/folders/${uploadableId}/uploads`, {
                method: 'POST',
                body: formData,
                headers: {
                    'X-CSRF-Token': csrfToken,
                },
                credentials: 'include', 
            })
            .then(response => {
                if (!response.ok) throw new Error('Network response was not ok.');
                return response.json();
            })
            .then(() => {
                handleClose();
                // Consider updating the UI or state to reflect the new upload instead of reloading
            })
            .catch(error => {
                console.error('Error:', error);
            });
        });
    };

    return (
        <div className={`modal fade ${show ? 'show' : ''}`} style={{ display: show ? 'block' : 'none' }} tabIndex="-1" role="dialog">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Upload File(s)</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={handleClose}>
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="modal-body">
                            <div {...getRootProps()} className="dropzone">
                                <input {...getInputProps()} />
                                {
                                    isDragActive ?
                                    <p>Drop the files here ...</p> :
                                    <p>Drag 'n' drop some files here, or click to select files</p>
                                }
                            </div>
                            <ul>
                                {files.map(file => (
                                    <li key={file.path}>{file.path} - {file.size} bytes</li>
                                ))}
                            </ul>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={handleClose}>Close</button>
                            <button type="submit" className="btn custom-button">Upload</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default UploadModal;