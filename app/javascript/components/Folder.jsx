import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import NewFolder from "./NewFolder";
import UploadModal from './UploadModal';

const Folder = () => {
    const params = useParams();
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const [showUploadModal, setShowUploadModal] = useState(false);
    const parentId = params.id; 
    const [folderData, setFolderData] = useState({ folder: { title: '' }, sub_folders: [] });
    const [uploads, setUploads] = useState([]);

    useEffect(() => {
        const fetchFolderDetails = async () => {
            try {
                const folderResponse = await fetch(`/api/v1/folders/${params.id}`);
                if (!folderResponse.ok) throw new Error('Failed to fetch folder data.');
                const folderData = await folderResponse.json();
                setFolderData(folderData);
    
                const uploadsResponse = await fetch(`/api/v1/folders/${params.id}/uploads`);
                if (!uploadsResponse.ok) throw new Error('Failed to fetch uploads data.');
                const uploadsData = await uploadsResponse.json();
                setUploads(uploadsData);
            } catch (error) {
                console.error("Error:", error);
                navigate("/");
            }
        };
    
        fetchFolderDetails();
    }, [params.id, navigate]);

    
    const SubFolders = () => {
        return (
            <ul className="list-group">
                {folderData.sub_folders.map((subFolder) => (
                    <li key={subFolder.id} className="list-group-item d-flex flex-row justify-content-between align-items-center my-2 border border-dark">
                        <Link to={`/folder/${subFolder.id}`} className="btn btn-link">
                            {subFolder.title}
                        </Link>
                        <div className="text-muted">
                            <span>{new Date(subFolder.created_at).toLocaleDateString()}</span>
                        </div>
                    </li>
                ))}
            </ul>
        );
    };

    const UploadsList = () => {
        return uploads.map((upload) => (
            <li key={upload.id} className="list-group-item d-flex justify-content-between align-items-center my-2 border border-dark">
                <span>{upload.title}</span>
                <div>
                    <span>{upload.file_size}</span> 
                    <span className="ms-2 text-muted">{new Date(upload.created_at).toLocaleDateString()}</span>
                </div>
            </li>
        ));
    };

    // const noFolders = (
    //     <div className="vw-100 vh-50 d-flex align-items-center justify-content-center">
    //       <h4>
    //         No projects yet. <button onClick={() => setShowModal(true)}>New Folder</button>
    //       </h4>
    //     </div>
    //   );



    return (
        <>
            <main className="container">
                <div>
                    <h2>Folder: {folderData.folder.title}</h2>
                </div>
                <div className="row">
                    <ul className="list-group">
                        {SubFolders()}
                        {UploadsList()}
                    </ul>
                </div>
                <button onClick={() => setShowModal(true)} className="btn custom-button">New Folder</button>
                <button onClick={() => setShowUploadModal(true)} className="btn custom-button ms-2">Add Upload</button>
                <NewFolder show={showModal} handleClose={() => setShowModal(false)} parentId={parentId} />
                <UploadModal show={showUploadModal} handleClose={() => setShowUploadModal(false)} uploadableId={parentId} />
            </main>
        </>
    );
};

export default Folder;