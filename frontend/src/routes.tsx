import { useAuth } from "./contexts/AuthContext";
import { Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage/HomePage.tsx'
import LoginPage from './components/LoginPage/LoginPage.tsx'
function AppRoutes() {
    const { isLoggedIn } = useAuth();
    return (
        <Routes>
            <Route path="/home" element={<HomePage/>}/>
            <Route path="/login" element={<LoginPage />}/>

            {/* PROTECTED ROUTES HERE */}
        </Routes>
    );
}
export default AppRoutes;