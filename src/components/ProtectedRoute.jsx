import { Navigate } from "react-router-dom";
import UseUser from "../hook/UseUser"

const ProtectedRoute = ({ children }) => {
    const { globalUser } = UseUser();
    if (!globalUser) {
        return <Navigate to="/" />
    }
    return children
}

export default ProtectedRoute
