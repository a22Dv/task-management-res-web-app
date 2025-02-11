import { useAuth } from "./contexts/AuthContext";
import { Route, Routes, Navigate } from "react-router-dom";
import HomePage from "./components/HomePage/HomePage.tsx";
import LoginPage from "./components/LoginPage/LoginPage.tsx";
import TaskList from "./components/TaskList/TaskList.tsx";
import Dashboard from "./components/Dashboard/Dashboard.tsx";

function AppRoutes() {
    const { isLoggedIn, username } = useAuth();
    return (
        <Routes>
            <Route path="/" element={<Navigate to="/home" replace />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route
                path={`/dashboard/${username}`}
                element={
                    isLoggedIn ? (
                        <Dashboard />
                    ) : (
                        <Navigate to="/login" replace />
                    )
                }
            />
            <Route
                path={"/dashboard"}
                element={<Navigate to="/login" replace />}
            />
            <Route
                path={`/tasklist/${username}`}
                element={
                    isLoggedIn ? <TaskList /> : <Navigate to="/login" replace />
                }
            />
        </Routes>
    );
}
export default AppRoutes;
