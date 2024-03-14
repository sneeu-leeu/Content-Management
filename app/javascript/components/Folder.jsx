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



    const subFolders = folderData.sub_folders.map((subFolder, index) => (
        <div key={index} className="d-flex flex-row justify-content-around align-items-center list-group-item border border-dark my-2">
            <Link to={`/folder/${subFolder.id}`} className="btn">
                {subFolder.title}
            </Link>
            <div className="text-muted">
                <span className="">{new Date(subFolder.created_at).toLocaleDateString()}</span>
                {/* <span className="badge bg-secondary ms-2">{folder.size} items</span> */}
            </div>
        </div>
    ));


    const UploadsList = uploads.map((upload, index) => (
        <div key={index} className="d-flex flex-row justify-content-around align-items-center list-group-item border border-dark my-2">
            <Link to={`/uploads/${upload.id}`} state={{ folderId: folderData.folder.id }}>
                View Upload
            </Link>
            <div className="text-muted">
                <span className="">{new Date(upload.created_at).toLocaleDateString()}</span>
                {/* <span className="badge bg-secondary ms-2">{upload.file_size} items</span> */}
            </div>
        </div>
    ));


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
                    {subFolders}
                    {UploadsList}
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