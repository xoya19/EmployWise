import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "../components/Login";
import Users from "../components/Users";

export default function App() {
  return (
    <Router basename="/EmployWise">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/users" element={<Users />} />
      </Routes>
    </Router>
  );
}
