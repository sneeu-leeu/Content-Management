import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import NewFolder from './NewFolder';

const Folders = () => {
  const navigate = useNavigate();
  const [folders, setFolders] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchFolders();
  }, []);

  const fetchFolders = async () => {
    const url = "/api/v1/folders";
    fetch(url)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then((res) => {
        const topLevelFolders = res.filter(folder => folder.parent_id === null);
        setFolders(topLevelFolders);
      })
      .catch(() => navigate("/"));
  };

  const handleAddNewFolder = (newFolder) => {
    setFolders(prevFolders => [...prevFolders, newFolder]);
  };

  return (
    <>
      <div className="mt-4">
        <main className="container">
          <div className="row">
            {folders.length > 0 ? folders.map((folder, index) => (
              <div key={index} className="d-flex flex-row justify-content-around align-items-center list-group-item border border-dark my-2">
                <Link to={`/folder/${folder.id}`} className="btn">
                  {folder.title}
                </Link>
                <div className="text-muted">
                  <span>{new Date(folder.created_at).toLocaleDateString()}</span>
                </div>
              </div>
            )) : (
              <div className="vw-100 vh-50 d-flex align-items-center justify-content-center">
                <h4>No projects yet.</h4>
              </div>
            )}
          </div>
          <div className="mt-3">
            <button onClick={() => setShowModal(true)} className="btn custom-button ms-2">New Folder</button>
          </div>
        </main>
      </div>

      <NewFolder show={showModal} handleClose={() => setShowModal(false)} parentId={null} onFolderAdded={handleAddNewFolder} />
    </>
  );
};

export default Folders;