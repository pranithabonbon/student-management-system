import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    const dashboardLink = user?.role === "student" ? "/student"
        : user?.role === "faculty" ? "/faculty"
        : user?.role === "admin" ? "/admin" : "/";

    return (
        <nav className="navbar navbar-expand-lg navbar-dark" style={{ background: "#1a1a2e" }}>
            <div className="container-fluid">
                <Link className="navbar-brand fw-bold" to={dashboardLink}>
                    🎓 Student Management System
                </Link>

                <div className="d-flex align-items-center gap-3">
                    {user && (
                        <>
                            <Link className="nav-link text-white" to="/analytics">Analytics</Link>
                            {user.role === "admin" && (
                                <Link className="nav-link text-white" to="/admin">Admin</Link>
                            )}
                            <span className="text-white-50 small">
                                {user.name} ({user.role})
                            </span>
                            <button className="btn btn-outline-light btn-sm" onClick={handleLogout}>
                                Logout
                            </button>
                        </>
                    )}
                    {!user && (
                        <Link className="btn btn-success btn-sm" to="/login">Login</Link>
                    )}
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
