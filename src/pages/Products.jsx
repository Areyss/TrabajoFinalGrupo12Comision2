import { Box, SimpleGrid, Text } from "@chakra-ui/react";
import { useProductos } from "../hooks/useProductos";
import { useAppColors } from "../theme/colors";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import CardProductList from "../components/CardProductList";
import SortMenuButton from "../components/SortMenuButton";
import { useMemo, useState } from "react";

const Products = () => {
  const { searchResults, productos } = useProductos();
  const colors = useAppColors();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [sortType, setSortType] = useState("valoracion");
  // Si hay resultados de búsqueda, filtralos; si no, muestra todos los productos
  const productosFiltrados = searchResults && searchResults.length > 0 ? searchResults : productos;


  const productosAMostrar = useMemo(() => {
  let sorted = [...productosFiltrados];
  if (sortType === "precio-mayor") sorted.sort((a, b) => b.price - a.price);
  else if (sortType === "precio-menor") sorted.sort((a, b) => a.price - b.price);
  else if (sortType === "valoracion") sorted.sort((a, b) => (b.rating?.rate || 0) - (a.rating?.rate || 0));
  return sorted;
}, [productosFiltrados, sortType]);
  return (
    <Box py={1} px={5}>
      <Text fontFamily="sans-serif" fontSize={30} mb={1} textAlign="center">
        Resultados de búsqueda
      </Text>
      <Box display="flex" justifyContent="flex-end" mb={2}>
        <SortMenuButton sortType={sortType} setSortType={setSortType} />
      </Box>
      {productosAMostrar.length === 0 ? (
        <Box textAlign="center" mt={10}>
          <Text fontSize="xl" color="gray.400">
            No hay productos para mostrar.
          </Text>
        </Box>
      ) : (
        <SimpleGrid columns={1} gap={5}>
          {productosAMostrar.map((producto) => (
            <CardProductList
              key={producto.id}
              producto={producto}
              colors={colors}
              user={user}
              onVerDetalles={() => navigate(`/productos/${producto.id}`)}
              onEditar={() => navigate(`/productos/editar/${producto.id}`)}
              onEliminar={() => navigate(`/productos/eliminar/${producto.id}`)}
            />
          ))}
        </SimpleGrid>
      )}
    </Box>
  );
};

export default Products;