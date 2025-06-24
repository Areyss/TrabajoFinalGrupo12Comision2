import { Box, SimpleGrid, Flex, Text } from "@chakra-ui/react";
import { useAppColors } from "../theme/colors";
import { useProductos } from "../hooks/useProductos";
import { useNavigate } from "react-router-dom";
import CardProduct from "../components/CardProduct";
import { useAuth } from "../hooks/useAuth";

const FavoriteProducts = () => {
    const colors = useAppColors();
    const navigate = useNavigate();
    const { productos } = useProductos();
    const { user } = useAuth();
    const favoritos = user?.favoritos || [];
    const productosFavoritos = productos.filter(p => favoritos.includes(p.id) && p.disponible);
    
    return (
        <Box py={1} px={5}>
            <Flex
                justify="space-between"
                align="center"
                mx="auto"
                mb={5}
            >
                <Box flex="1">
                    <Text fontFamily="sans-serif" fontSize={30} fontWeight={"semibold"} color={colors.primary}>
                        Mis Favoritos
                    </Text>
                </Box>
            </Flex>
            {/*Si no hay productos disponibles, mostrar mensaje */}
            {productosFavoritos.length === 0 ? (
                <Box textAlign="center" mt={10}>
                    <Text fontSize="xl" color="gray.400">
                        No hay productos favoritos.
                    </Text>
                </Box>
            ) : (
                <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} gap={10}>
                    {productosFavoritos.map((producto) => (
                        <CardProduct
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

export default FavoriteProducts;
