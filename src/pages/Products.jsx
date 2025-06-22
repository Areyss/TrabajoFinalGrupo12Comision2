import { Box, SimpleGrid, Text } from "@chakra-ui/react";
import { useProductos } from "../hooks/useProductos";
import { useAppColors } from "../theme/colors";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import CardProductList from "../components/CardProductList";

const Products = () => {
  const { searchResults, productos, toggleFavorito } = useProductos();
  const colors = useAppColors();
  const { user } = useAuth();
  const navigate = useNavigate();

  // Si hay resultados de búsqueda, muéstralos; si no, muestra todos los productos
  const productosAMostrar = searchResults && searchResults.length > 0
    ? searchResults
    : productos;

  return (
    <Box py={5} px={5}>
      <Text fontFamily="sans-serif" fontSize={30} mb={5} textAlign="center">
        Resultados de búsqueda
      </Text>
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
              onToggleFavorito={() => toggleFavorito(producto.id)}
            />
          ))}
        </SimpleGrid>
      )}
    </Box>
  );
};

export default Products;