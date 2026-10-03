import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function ProtectedRoute({ children, allowedRoles }) {
    const { user } = useAuth();

    if (!user) return <Navigate to="/login" replace />;

    if (allowedRoles && !allowedRoles.includes(user.role)) {
        const redirect = user.role === "student" ? "/student" : user.role === "faculty" ? "/faculty" : "/admin";
        return <Navigate to={redirect} replace />;
    }

    return children;
}

export default ProtectedRoute;
