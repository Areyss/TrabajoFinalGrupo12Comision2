import { createContext, useContext, useState } from "react";
import productsData from "../data/products.json";

// Crea el contexto
export const ProductosContext = createContext(null);

// Proveedor del contexto
export const ProductosProvider = ({ children }) => {
  const [productos, setProductos] = useState(productsData);

  return (
    <ProductosContext.Provider value={{ productos, setProductos }}>
      {children}
    </ProductosContext.Provider>
  );
};
