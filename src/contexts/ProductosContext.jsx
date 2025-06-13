import { createContext, useContext, useEffect, useMemo, useState } from "react";

// Crea el contexto
export const ProductosContext = createContext(null);

// Proveedor del contexto
export const ProductosProvider = ({ children }) => {
  const [productos, setProductos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const [categorias, setCategorias] = useState([]);

  const [favoritos, setFavoritos] = useState([]);

  useEffect(() => {
    const fetchProductos = async () => {
      setIsLoading(true);
      try {
        setIsLoading(true);
        setError(null); // Reiniciar error antes de la carga
        
        const response = await fetch("https://fakestoreapi.com/products");
        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();

        // Obtener categorías únicas de los productos sin duplicados o nulos
        const categoriesData = Array.from(new Set(data.map(product => product.category).filter(Boolean)));

        const normalizedData = data.map(product => ({
          ...product,
          disponible: true, // Agregar campo disponible
          favorito: false, // Agregar campo favorito
        }));

        setProductos(normalizedData);
        setCategorias(categoriesData);
      } catch (err) {
        console.error("Error al cargar los productos:", err);
        setError("Error al cargar los productos.Inténtalo de nuevo más tarde.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProductos();
  }, []);

  // Función para agregar un producto
  const addProducto = (nuevoProducto) => {
    // Generar un id único 
    const id = productos.length > 0 ? productos[productos.length - 1].id + 1 : 1;
    setProductos([...productos, { ...nuevoProducto, id, disponible: true }]);
    // console.log("Producto agregado:", nuevoProducto);
  };
  // Función para agregar una categoría
  const addCategoria = (nombre) => {
    const nombreNormalizado = nombre.trim().toLowerCase();
    const existe = categorias.some(
      cat => cat.trim().toLowerCase() === nombreNormalizado
    );
    if (existe) return; // No agregar duplicados
    setCategorias([...categorias, nombre .trim()]);

  };

  //Funcion para el eliminado logico del producto
  const deleteProducto = (id) => {
    setProductos((prevProductos) =>
      prevProductos.map((prod) =>
        prod.id === id ? { ...prod, disponible: false } : prod
      )
    );
  };

  //Funcion para buscar el id de un producto
  const getProductoId = (id) => {
    return productos.find((prod) => prod.id === parseInt(id));
  };

  //Funcion para restaurar producto
  const restoreProducto = (id) => {
    setProductos((prevProductos) =>
      prevProductos.map((prod) =>
        prod.id === id ? { ...prod, disponible: true } : prod
      )
    );
  };

const toggleFavorito = (idProducto) => {
  setProductos(prev =>
    prev.map(producto =>
      producto.id === idProducto
        ? { ...producto, favorito: !producto.favorito }
        : producto
    )
  );
};

  const contextValue = useMemo(() => ({
    productos,
    setProductos,
    addProducto,
    deleteProducto,
    getProductoId,
    restoreProducto,
    categorias,
    addCategoria,
    favoritos,
    toggleFavorito,
  }), [productos, categorias, favoritos]);

  

  return (
    <ProductosContext.Provider value={contextValue}>
      {children}
    </ProductosContext.Provider>
  );
};
