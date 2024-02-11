// client/src/utils/AuthContext.js
import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);

    const login = (userCredentials) => {
        // Placeholder for login logic
        // Set the user as logged in
        setCurrentUser({ id: "user1", email: "user@example.com" }); // Simulate a logged-in user
    };

    const logout = () => {
        setCurrentUser(null);
    };

    const value = {
        currentUser,
        login,
        logout,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
