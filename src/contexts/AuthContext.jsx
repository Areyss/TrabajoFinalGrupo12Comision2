import { createContext, useState, useMemo, useCallback, useEffect } from 'react';

import usersData from "../data/users.json";

// Se crea el contexto
export const AuthContext = createContext(null);

// 2. Componente Proveedor del Contexto de Autenticacién
export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    // Solo con la intencién de pensar en cargas asincronas de datos
    const [isLoading, setIsLoading] = useState(false);
    // Variable de error para el login
    const [errorLogin, setErrorLogin] = useState(null);

    // Restaurar usuario del localStorage al cargar la app
    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const login = (navigate) => (e) => {
        e.preventDefault();
        const form = e.target;
        const username = form.elements.username.value;
        const password = form.elements.password.value;

        if (!username || !password) {
            setErrorLogin('No puede enviar ningun campo vacio.');
            return;
        }

        setIsLoading(true);
        try {
            const usuarioEncontrado = usersData.find(
                u => u.username === username && u.password === password
            );

            if (usuarioEncontrado) {
                const { password, ...userWithoutPassword } = usuarioEncontrado;
                setUser(userWithoutPassword);
                localStorage.setItem('user', JSON.stringify(userWithoutPassword));
                setIsLoading(false);
                setErrorLogin(null);
                navigate('/');
            } else {
                setUser(null);
                localStorage.removeItem('user'); // Limpieza por si acaso
                setIsLoading(false);
                setErrorLogin('Usuario o contraseña incorrectos, intentelo nuevamente');
            }
        } catch (error) {
            console.error('Error inesperado:', error.message);
            setUser(null);
            setIsLoading(false);
            setErrorLogin('Ocurrió un error inesperado');
        }
    };

    const logout = useCallback(() => {
        setUser(null);
         localStorage.removeItem('user');
    }, []);

    const authContextValue = useMemo(() => ({
        user,
        isAuthenticated: !!user,
        isLoading,
        logout,
        login,
        errorLogin
    }), [user, isLoading, logout, login, errorLogin]);

    // Provee el valor del conteto a los hijos
    return (
        <AuthContext.Provider value={authContextValue}>
            {children}
        </AuthContext.Provider>
    );
};

