import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Folders from "../components/Folders";
import Folder from "../components/Folder";
import UploadView from "../components/UploadView";

const AppRoutes = () => (
  <Router>
    <div className="d-flex flex-column" style={{ minHeight: '100vh' }}>
      <Navbar />
      <div className="flex-grow-1">
        <Routes>
          <Route path="/" element={<Folders />} />
          <Route path="/folder/:id" element={<Folder />} />
          <Route path="/uploads/:uploadId" element={<UploadView />} />
        </Routes>
      </div>
      <Footer />
    </div>
  </Router>
);

export default AppRoutes;