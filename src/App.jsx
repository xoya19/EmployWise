import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "../components/Login";
import Users from "../components/Users";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/users" element={<Users />} />
    </Routes>
  );
}
