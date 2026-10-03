import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login as apiLogin } from "../services/api";
import { useAuth } from "../context/AuthContext";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        try {
            const res = await apiLogin({ email, password });
            login(res.data.data);
            const role = res.data.data.role;
            navigate(role === "student" ? "/student" : role === "faculty" ? "/faculty" : "/admin");
        } catch {
            setError("Invalid email or password");
        } finally {
            setLoading(false);
        }
    };

    const quickLogin = (credEmail, credPassword) => {
        setEmail(credEmail);
        setPassword(credPassword);
    };

    return (
        <div className="login-page">
            <div className="login-card">
                <div className="text-center mb-4">
                    <h2 className="fw-bold">🎓 Student Management</h2>
                    <p className="text-muted">Sign in to your dashboard</p>
                </div>

                {error && <div className="alert alert-danger">{error}</div>}

                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Email</label>
                        <input type="email" className="form-control" value={email}
                            onChange={(e) => setEmail(e.target.value)} required />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Password</label>
                        <input type="password" className="form-control" value={password}
                            onChange={(e) => setPassword(e.target.value)} required />
                    </div>
                    <button type="submit" className="btn btn-primary w-100" disabled={loading}>
                        {loading ? "Signing in..." : "Sign In"}
                    </button>
                </form>

                <hr className="my-4" />
                <p className="text-muted small text-center mb-2">Quick login (demo)</p>
                <div className="d-flex flex-column gap-2">
                    <button className="btn btn-outline-success btn-sm"
                        onClick={() => quickLogin("rahul@student.edu", "123456")}>
                        Student — rahul@student.edu
                    </button>
                    <button className="btn btn-outline-info btn-sm"
                        onClick={() => quickLogin("rajesh@cse.edu", "123456")}>
                        Faculty — rajesh@cse.edu
                    </button>
                    <button className="btn btn-outline-warning btn-sm"
                        onClick={() => quickLogin("admin@edu.com", "admin123")}>
                        Admin — admin@edu.com
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Login;
