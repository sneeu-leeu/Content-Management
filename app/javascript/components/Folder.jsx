import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const Folder = () => {
    const params = useParams();
    const navigate = useNavigate();
    // Adjusted to better reflect the expected data structure
    const [folderData, setFolderData] = useState({ folder: { title: '' }, sub_folders: [] });

    useEffect(() => {
        // Updated to match your Rails routes
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

    return (
        <div>
            <h2>Folder: {folderData.folder.title}</h2>
            <ul>{renderSubFolders()}</ul>
        </div>
    );
};

export default Folder;