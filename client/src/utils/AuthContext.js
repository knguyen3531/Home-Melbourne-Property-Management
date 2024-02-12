import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

export function useAuth() {
    return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
    const [authData, setAuthData] = useState({ user: null, token: null });

    const graphqlEndpoint = process.env.REACT_APP_GRAPHQL_ENDPOINT || 'https://home-melbourne.herokuapp.com/graphql';

    const login = async (email, password) => {
        try {
            const response = await fetch(graphqlEndpoint, { // Ensure this URL is correct
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify({
                    query: `
                        mutation LoginUser($email: String!, $password: String!) {
                            loginUser(email: $email, password: $password) {
                                success
                                message
                                user {
                                    id
                                    email
                                }
                                token
                            }
                        }
                    `,
                    variables: {
                        email,
                        password,
                    },
                }),
            });
            const { data } = await response.json();
            if (data && data.loginUser.success) {
                setAuthData({ user: data.loginUser.user, token: data.loginUser.token });
                return data.loginUser;
            } else {
                throw new Error(data.loginUser.message);
            }
        } catch (error) {
            return { success: false, message: error.message };
        }
    };

    const logout = () => {
        setAuthData({ user: null, token: null });
    };

    return (
        <AuthContext.Provider value={{ ...authData, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
