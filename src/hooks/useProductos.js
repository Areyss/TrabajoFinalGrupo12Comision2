import { useContext } from "react";
import { ProductosContext } from "../contexts/ProductosContext";

export function useProductos() {
    const context = useContext(ProductosContext);
    if (context === null) {
        throw new Error("useProductos debe usarse dentro de un ProductosProvider");
    }
    return context
}