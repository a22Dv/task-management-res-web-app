import { BrowserRouter } from "react-router-dom";
import AppRoutes from './routes.tsx';
import { AuthProvider } from './contexts/AuthContext.tsx';
import { ThemeProvider, createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: '#88292F',
    },
    secondary: {
      main: '#F5C118',
    },
    background: {
      default: '#FFFFFF',
    },
  },
  typography: {
    fontFamily: "'Inter'",
  },
});
function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <AuthProvider>
          <AppRoutes/>
        </AuthProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
}
export default App;