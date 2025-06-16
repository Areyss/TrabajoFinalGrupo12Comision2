import { Box, SimpleGrid, Button, Flex, Text } from "@chakra-ui/react";
import { useAppColors } from "../theme/colors";
import { useProductos } from "../hooks/useProductos";
import { useNavigate } from "react-router-dom";
import { BiSolidTrashAlt } from "react-icons/bi";
import { useAuth } from "../hooks/useAuth";
import CardProduct from "../components/CardProduct";
import ProductSkeleton from "../components/ProductSkeleton";

const Home = () => {
    const colors = useAppColors();
    const navigate = useNavigate();
    const { productos, toggleFavorito, isLoading } = useProductos();
    const { user } = useAuth();
    const productosDisponibles = productos.filter(p => p.disponible);
    return (
        <Box py={5} px={5}>
            <Flex
                justify="space-between"
                align="center"
                mx="auto"
                mb={5}
            >
                <Box flex="1" textAlign="center">
                    <Text fontFamily="sans-serif" fontSize={30}>
                        Lista de productos
                    </Text>
                </Box>
                {user?.rol === "administrador" && (
                    <>
                        <Button onClick={() => navigate(`productos-eliminados`)}>
                            <BiSolidTrashAlt size={30} />
                        </Button>
                    </>
                )}

            </Flex>
            {isLoading ? (
                <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} gap={10}>
                    {[...Array(6)].map((_, idx) => (
                        <ProductSkeleton key={idx} />
                    ))}
                </SimpleGrid>
            // Si no hay productos disponibles, mostrar mensaje 
            ): productosDisponibles.length === 0 ? (
            <Box textAlign="center" mt={10}>
                <Text fontSize="xl" color="gray.400">
                    No hay productos disponibles.
                </Text>
            </Box>
            ) : (
            <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} gap={10}>
                {productosDisponibles.map((producto) => (
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

export default Home;
