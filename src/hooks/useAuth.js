import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

// Hook personalizado para usar AuthContext en cualquier parte de la aplicación
export function useAuth () {
    const context = useContext(AuthContext);
    if (context === null) {
        throw new Error("useProductos debe usarse dentro de un ProductosProvider");
    }
    return context
};