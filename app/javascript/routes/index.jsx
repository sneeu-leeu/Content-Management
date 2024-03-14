import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Folders from "../components/Folders";
import Folder from "../components/Folder";
import UploadView from "../components/UploadView";


export default (
  <Router>
    <Routes>
      <Route path="/" element={<Folders />} />
      <Route path="/folder/:id" element={<Folder />} />
      <Route path="/uploads/:uploadId" element={<UploadView />} />
    </Routes>
  </Router>
);