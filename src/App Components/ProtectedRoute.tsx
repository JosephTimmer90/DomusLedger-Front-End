import { useBoundStore } from "../store";
import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoute() {
  const accessToken = useBoundStore((store) => store.accessToken);

  if (!accessToken) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}

export default ProtectedRoute;
