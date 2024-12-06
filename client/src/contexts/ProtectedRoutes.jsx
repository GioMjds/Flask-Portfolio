/* eslint-disable react/prop-types */
import { Navigate } from "react-router-dom";

const ProtectedRoutes = ({ isAuthenticated, children }) => {
    if (!isAuthenticated) {
        return <Navigate to="/" />
    }
    return <>{children}</>
}

export default ProtectedRoutes;