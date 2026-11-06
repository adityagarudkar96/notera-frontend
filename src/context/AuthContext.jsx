import { createContext, useEffect, useState } from "react";
import {
    getCurrentUser,
    loginUser as loginAPI,
    logoutUser as logoutAPI,
    registerUser as registerAPI
} from "../services/authService";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [authLoading, setAuthLoading] = useState(true);

    // Check existing login when the application starts
    useEffect(() => {
        async function checkAuth() {
            try {
                const response = await getCurrentUser();
                setUser(response.user);
            } catch (error) {
                setUser(null);
            } finally {
                setAuthLoading(false);
            }
        }

        checkAuth();
    }, []);

    // Login
    async function login(credentials) {
        await loginAPI(credentials);

        const response = await getCurrentUser();
        setUser(response.user);

        return response.user;
    }

    // Register
    async function register(userData) {
        return await registerAPI(userData);
    }

    // Logout
    async function logout() {
        try {
            await logoutAPI();
        } finally {
            setUser(null);
        }
    }

    const value = {
        user,
        authLoading,
        isAuthenticated: Boolean(user),
        login,
        register,
        logout
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}