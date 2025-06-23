import { createContext, useState, useMemo, useCallback, useEffect } from 'react';

import usersData from "../data/users.json";

// Se crea el contexto
export const AuthContext = createContext(null);

// Componente Proveedor del contexto
export function AuthProvider({ children }) {
    // Estado para el usuario autenticado
    const [user, setUser] = useState(null);
    // Solo con la intencion de pensar en cargas asincronas de datos
    const [isLoading, setIsLoading] = useState(false);
    // Variable de error
    const [errorLogin, setErrorLogin] = useState(null);

    // Al iniciar la app, restaurar el usuario desde localStorage si existe
    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    // Función que maneja el submit del formulario
    const login = (navigate) => (e) => {
        e.preventDefault(); // Previene recarga del formulario
        const form = e.target;
        const username = form.elements.username.value;
        const password = form.elements.password.value;

        // Validación de campos vacíos
        if (!username || !password) {
            setErrorLogin('No puede enviar ningun campo vacio.');
            return;
        }

        setIsLoading(true);
        try {
            // Busca un usuario que coincida con las credenciales
            const usuarioEncontrado = usersData.find(
                u => u.username === username && u.password === password
            );

            if (usuarioEncontrado) {
                // Remueve la contraseña antes de guardar el usuario
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
            // Manejo de errores inesperados
            console.error('Error inesperado:', error.message);
            setUser(null);
            setIsLoading(false);
            setErrorLogin('Ocurrió un error inesperado');
        }
    };

    // Función para cerrar sesión
    const logout = useCallback(() => {
        setUser(null);
        localStorage.removeItem('user');
    }, []);

    // Memoriza el valor del contexto para evitar renders innecesarios
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

