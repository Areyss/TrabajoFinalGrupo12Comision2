import { createContext, useContext, useMemo, useState } from "react";
import productsData from "../data/products.json";
import categoriesData from "../data/categories.json"
// Crea el contexto
export const ProductosContext = createContext(null);

// Proveedor del contexto
export const ProductosProvider = ({ children }) => {
  const [productos, setProductos] = useState(productsData);
  const [categorias, setCategorias] = useState(categoriesData);

  // Función para agregar un producto
  const addProducto = (nuevoProducto) => {
    // Generar un id único 
    const id = productos.length > 0 ? productos[productos.length - 1].id + 1 : 1;
    setProductos([...productos, { ...nuevoProducto, id, disponible: true }]);
    console.log("Producto agregado:", nuevoProducto);
  };
  // Función para agregar una categoría
   const addCategoria = (nombre) => {
    const id = categorias.length > 0 ? categorias[categorias.length - 1].id + 1 : 1;
    setCategorias([...categorias, { id, nombre }]);
  };

  const contextValue = useMemo(() => ({
    productos,
    setProductos,
    addProducto,
    categorias,
    addCategoria
  }), [productos, categorias]);

  return (
    <ProductosContext.Provider value={contextValue}>
      {children}
    </ProductosContext.Provider>
  );
};
