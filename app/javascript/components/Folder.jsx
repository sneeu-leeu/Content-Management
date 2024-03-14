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

    useEffect(() => {
        const url = `/api/v1/folders/${params.id}`;
        fetch(url)
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error("Network response was not ok.");
            })
            .then((data) => setFolderData(data))
            .catch(() => navigate("/"));
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
                            {/* Assuming you have a created_at or similar date property for sub folders */}
                            <span>{new Date(subFolder.created_at).toLocaleDateString()}</span>
                        </div>
                    </li>
                ))}
            </ul>
        );
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
                    <ul>{SubFolders()}</ul>
                </div>
                <button onClick={() => setShowModal(true)}>New Folder</button>
                <button onClick={() => setShowUploadModal(true)} className="btn btn-secondary ms-2">Add Upload</button>
                <NewFolder show={showModal} handleClose={() => setShowModal(false)} parentId={parentId} />
                <UploadModal show={showUploadModal} handleClose={() => setShowUploadModal(false)} uploadableId={parentId} />
            </main>
        </>
    );
};

export default Folder;