import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import StudentDashboard from "./pages/StudentDashboard";
import FacultyDashboard from "./pages/FacultyDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import Analytics from "./pages/Analytics";
import "./styles/dashboard.css";

function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Navbar />
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/student" element={
                        <ProtectedRoute allowedRoles={["student"]}><StudentDashboard /></ProtectedRoute>
                    } />
                    <Route path="/faculty" element={
                        <ProtectedRoute allowedRoles={["faculty"]}><FacultyDashboard /></ProtectedRoute>
                    } />
                    <Route path="/admin" element={
                        <ProtectedRoute allowedRoles={["admin"]}><AdminDashboard /></ProtectedRoute>
                    } />
                    <Route path="/analytics" element={
                        <ProtectedRoute><Analytics /></ProtectedRoute>
                    } />
                    <Route path="/" element={<Navigate to="/login" replace />} />
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    );
}

export default App;
