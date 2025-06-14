import {
    Box,
    SimpleGrid,
    Image,
    Link,
    Center,
    Text,
    Button,
    Flex,
    IconButton
} from "@chakra-ui/react";
import { useAppColors } from "../theme/colors";
import { useColorModeValue } from "../components/ui/color-mode";
import { useProductos } from "../hooks/useProductos";
import { useNavigate } from "react-router-dom";
import { BiSolidTrashAlt } from "react-icons/bi";
import { LuHeart} from "react-icons/lu";

const Home = () => {
    const colors = useAppColors();
    const navigate = useNavigate();
    const { productos, toggleFavorito } = useProductos();
    const productosFavoritos = productos.filter(p => p.favorito && p.disponible);
    return (
        <Box py={10} px={5}>
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
                <Button onClick={() => navigate(`productos-eliminados`)}>
                    <BiSolidTrashAlt size={30} />
                </Button>
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
                        <Box
                            key={producto.id}
                            bg={useColorModeValue("#3B4147", "gray.800")}
                            p={6}
                            borderRadius="xl"
                            boxShadow="lg"
                            _hover={{
                                boxShadow: "xl",
                                transform: "scale(1.02)",
                                transition: "0.3s",
                            }}
                            position="relative"
                        >

                            <Center mb={4} border="1px solid" borderColor={colors.secondary} bg="white" borderRadius="md" overflow="hidden" position="relative" >
                                <Link >
                                    <Image
                                        src={producto.image}
                                        alt={producto.title}
                                        borderRadius="md"
                                        objectFit="cover"
                                        w="100%"
                                        h="200px"
                                    />
                                </Link>                            
                            </Center>

                            <IconButton aria-label="Favorite"
                                key={producto.id}
                                rounded="full"
                                position="absolute"
                                top={6} right={6}
                                color={colors.gray}
                                opacity={0.9}
                                variant="ghost"
                                size="xl"
                                onClick={() => toggleFavorito(producto.id)}
                                >
                                {producto.favorito ? <Box fontSize="lg" position="absolute" top={2}>❤️</Box> : <LuHeart />}
                            </IconButton>

                            <Flex justify="space-between" align="center" mb={2}>
                                <Box fontSize="xl" fontWeight="bold" color={colors.textPrimary}>
                                    {producto.title}
                                </Box>
                            </Flex>
                            <Box textAlign="center" fontSize="lg" mb={4} fontWeight="semibold" color={colors.success}>
                                ${producto.price.toFixed(2)}
                            </Box>
                            <Flex gap={3} wrap="wrap" justify="center">
                                <Button
                                    bg={useColorModeValue("#3B4147", "gray.800")}
                                    border="2px solid"
                                    borderColor="yellow.500"
                                    color="yellow.500"
                                    onClick={() => navigate(`/productos/${producto.id}`)}
                                    boxShadow="md"
                                    _hover={{ transform: "scale(1.05)" }}
                                >
                                    Ver detalles
                                </Button>
                                <Button bg={useColorModeValue("blue.500", "blue.500")} size="sm">
                                    Editar
                                </Button>
                                <Button
                                    bg={useColorModeValue("#3B4147", "gray.800")}
                                    border="2px solid"
                                    borderColor="red.500"
                                    color="red.500"
                                    size="sm"
                                    onClick={() => navigate(`/productos/eliminar/${producto.id}`)}
                                    boxShadow="md"
                                    _hover={{ transform: "scale(1.05)" }}
                                >
                                    Eliminar
                                </Button>
                            </Flex>
                        </Box>
                    ))}
                </SimpleGrid>
            )}
        </Box>
    );
};

export default Home;
