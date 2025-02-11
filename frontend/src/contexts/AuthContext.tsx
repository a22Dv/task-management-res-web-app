import React, { createContext, PropsWithChildren, useContext, useState, JSX } from "react";

interface authResponse {
    isValid: boolean
}

// Set endpoint location.
const apiPort: number = 3000;
const authEndPoint: string = `http://localhost:${apiPort}/auth`

// Set default context value.
const defaultContextValue = {
    isLoggedIn: false,
    username: '',
    login: (_username: string, _password: string) => Promise.resolve(false),
    logout: () => { },
}
const AuthContext = createContext(defaultContextValue);
export const AuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
    // Track state.
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState(localStorage.getItem('taskUsername') || ''); // Persistence.

    // Login function.
    const login = async (username: string, password: string): Promise<boolean> => {
        const response = await fetch(`${authEndPoint}?username=${username}&password=${password}`);
        const authData: authResponse = await response.json();
        setIsLoggedIn(authData.isValid);
        authData.isValid && localStorage.setItem('taskUsername', username);
        authData.isValid && setUsername(username);
        return authData.isValid;
    }
    
    // Log-out function.
    const logout = () => {
        setIsLoggedIn(false);
        setUsername('');
        localStorage.removeItem('taskUsername');
    }
    const authContextValue = {
        isLoggedIn,
        username,
        login,
        logout,
    }
    return (
        <AuthContext.Provider value={authContextValue}>
            {children}
        </AuthContext.Provider>
    );
};
export const useAuth = () => useContext(AuthContext);
