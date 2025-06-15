import { createContext, useState, useMemo, useCallback } from 'react';

import usersData from "../data/users.json";

// Se crea el contexto
export const AuthContext = createContext(null);

// 2. Componente Proveedor del Contexto de Autenticacién
export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    // Solo con la intencién de pensar en cargas asincronas de datos
    const [isLoading, setIsLoading] = useState(false);

    const login = useCallback((credentials) => {
        setIsLoading(true);
        try {
            const usuarioEncontrado = usersData.find(
                u => u.username === credentials.username && u.password === credentials.password
            );

            if (usuarioEncontrado) {
                const { password, ...userWithoutPassword } = usuarioEncontrado;
                setUser(userWithoutPassword);
                setIsLoading(false);
                return { success: true }; // Retorna éxito
            } else {
                //Si no se encontró el usuario
                setUser(null);
                setIsLoading(false); // Desactiva carga
                // Retorna un objeto error
                return { success: false, message: 'Usuario o password incorrectos' };
            }
        } catch (error) {
            console.error("Login failed due to unexpected error:", error.message);
            setUser(null);
            setIsLoading(false);
            return { success: false, message: 'Ocurrió un error inesperado' };
        }
    }, []);

    const logout = useCallback(() => {
        setUser(null);
    }, []);

    // Variable de error para el login
    const [errorLogin, setErrorLogin] = useState(null);

    const handleSubmit = (navigate) => (e) => {
        e.preventDefault();
        const form = e.target;
        const username = form.elements.username.value;
        const password = form.elements.password.value;

        if (!username || !password) {
            setErrorLogin('No puede dejar ningun campo vacio.');
            return;
        }

        const result = login({ username, password });

        if (result.success) {
            setErrorLogin(null);
            navigate('/');
        } else {
            // Establecer error.
            setErrorLogin('Usuario o contraseña no valido, intentelo nuevamente.');
        }
    };

    const authContextValue = useMemo(() => ({
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout,
        handleSubmit,
        errorLogin
    }), [user, isLoading, login, logout, handleSubmit, errorLogin]);

    // Provee el valor del conteto a los hijos
    return (
        <AuthContext.Provider value={authContextValue}>
            {children}
        </AuthContext.Provider>
    );
};

