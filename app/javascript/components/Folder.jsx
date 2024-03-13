import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import NewFolder from './NewFolder';

const Folder = () => {
    const params = useParams();
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const parentId = params.id; 
    const [folderData, setFolderData] = useState({ folder: { title: '' }, sub_folders: [] });

    useEffect(() => {
        const url = `/api/v1/show/${params.id}`;
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

    // Render sub-folders
    const renderSubFolders = () => {
        return folderData.sub_folders.map((subFolder) => (
            <li key={subFolder.id}>
                <Link to={`/folder/${subFolder.id}`}>{subFolder.title}</Link>
            </li>
        ));
    };

    console.log('Parent ID being sent:', parentId);


    return (
        <>
            <div>
                <h2>Folder: {folderData.folder.title}</h2>
                <ul>{renderSubFolders()}</ul>
            </div>
            <button onClick={() => setShowModal(true)}>New Folder</button>
            <NewFolder show={showModal} handleClose={() => setShowModal(false)} parentId={parentId} /> 
        </>
    );
};

export default Folder;