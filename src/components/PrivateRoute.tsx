import { Navigate, replace } from "react-router-dom";
import useAuthStore from "../store.js";

interface PrivateRouteProps {
    children: JSX.Element;
}

export default function PrivateRoute({ children }: PrivateRouteProps) {
    const {isAuthenticated} = useAuthStore();

    return isAuthenticated ? children : <Navigate to="/login" replace />;
}