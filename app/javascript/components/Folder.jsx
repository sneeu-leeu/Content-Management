import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import NewFolder from "./NewFolder";
import UploadModal from './UploadModal';
import Breadcrumb from './Breadcrumb';

const Folder = () => {
    const params = useParams();
    const navigate = useNavigate();
    const [showNewFolderModal, setShowNewFolderModal] = useState(false);
    const [showUploadModal, setShowUploadModal] = useState(false);
    const parentId = params.id; 
    const [folderData, setFolderData] = useState({ folder: { title: '' }, sub_folders: [] });
    const [uploads, setUploads] = useState([]);


    useEffect(() => {
        fetchFolderDetails();
    }, [params.id]);

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

    const handleAddNewFolder = (newFolder) => {
        setFolderData(prevData => ({
            ...prevData,
            sub_folders: [...prevData.sub_folders, newFolder]
        }));
    };

    const handleAddNewUpload = (newUpload) => {
        setUploads(prevUploads => [...prevUploads, newUpload]);
    };

    const handleDeleteUpload = async (uploadId) => {
        const isConfirmed = window.confirm('Are you sure you want to delete this item?');

        if (isConfirmed) {
            try {
                const response = await fetch(`/api/v1/folders/${params.id}/uploads/${uploadId}`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ upload: { deleted: true } }),
                });
                if (!response.ok) throw new Error('Failed to delete upload.');
        
                setUploads(uploads.filter(upload => upload.id !== uploadId));
            } catch (error) {
                console.error("Error:", error);
            }
        }
    };

    return (
        <>
            <Breadcrumb pathSegments={[
                { name: 'Home', path: '/' },
                    ...folderData.ancestors?.map(ancestor => ({ name: ancestor.title, path: `/folder/${ancestor.id}` })) || [],
                { name: folderData.folder.title, path: `/folder/${params.id}` },
            ]} />
            <main className="container mt-4">
                <div><h2>Folder: {folderData.folder.title}</h2></div>
                <div className="row">
                    {folderData.sub_folders.map((subFolder, index) => (
                        <div key={index} className="d-flex flex-row justify-content-around align-items-center list-group-item border border-dark my-2">
                            <Link to={`/folder/${subFolder.id}`} className="btn">
                                {subFolder.title}
                            </Link>
                            <div className="text-muted">
                                <span>{new Date(subFolder.created_at).toLocaleDateString()}</span>
                            </div>
                        </div>
                    ))}
                    {uploads.map((upload, index) => (
                        <div key={index} className="d-flex flex-row justify-content-around align-items-center list-group-item border border-dark my-2">
                            <Link to={`/folder/${folderData.folder.id}/uploads/${upload.id}`} className="btn">
                                {upload.title}
                            </Link>
                            <div className="text-muted">
                                <span>{new Date(upload.created_at).toLocaleDateString()}</span>
                            </div>
                            <button onClick={() => handleDeleteUpload(upload.id)} className="btn ms-2">Delete</button>
                        </div>
                    ))}
                </div>
                <button onClick={() => setShowNewFolderModal(true)} className="btn custom-button">New Folder</button>
                <button onClick={() => setShowUploadModal(true)} className="btn custom-button ms-2">Add Upload</button>
                
                <NewFolder show={showNewFolderModal} handleClose={() => setShowNewFolderModal(false)} parentId={parentId} onFolderAdded={handleAddNewFolder} />
                <UploadModal show={showUploadModal} handleClose={() => setShowUploadModal(false)} uploadableId={parentId} onUploadAdded={handleAddNewUpload} />
            </main>
        </>
    );
};

export default Folder;