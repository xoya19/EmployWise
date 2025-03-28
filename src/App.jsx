import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "../components/Login";
import Users from "../components/Users";

export default function App() {
  return (
    <Routes>
      {/* Explicit root path */}
      <Route path="/" element={<Login />} />
      <Route path="/users" element={<Users />} />
      
      {/* Add catch-all route for GitHub Pages */}
      <Route path="*" element={<Login />} />
    </Routes>
  )
}

