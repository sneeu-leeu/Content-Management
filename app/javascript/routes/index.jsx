import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Folders from "../components/Folders";
import Folder from "../components/Folder";


export default (
  <Router>
    <Routes>
      <Route path="/" element={<Folders />} />
      <Route path="/folder/:id" element={<Folder />} />
    </Routes>
  </Router>
);