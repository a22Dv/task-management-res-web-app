import { BrowserRouter } from "react-router-dom";
import AppRoutes from './routes.tsx';
import { AuthProvider } from './contexts/AuthContext.tsx';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes/>
      </AuthProvider>
    </BrowserRouter>
  );
}
export default App;