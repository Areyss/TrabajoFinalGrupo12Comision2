import {
    Box,
    SimpleGrid,
    Image,
    Link,
    Center,
    Text,
    Button,
    Flex,
} from "@chakra-ui/react";
import { useAppColors } from "../../theme/colors";
import { useColorModeValue } from "../components/ui/color-mode";
import { useProductos } from "../hooks/useProductos";
import { useNavigate } from "react-router-dom";
import { BiSolidTrashAlt } from "react-icons/bi";
const Home = () => {
    const colors = useAppColors();
    const navigate = useNavigate();
    const { productos } = useProductos();
    const productosDisponibles = productos.filter(p => p.disponible);
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
            {productosDisponibles.length === 0 ? (
                <Box textAlign="center" mt={10}>
                    <Text fontSize="xl" color="gray.400">
                        No hay productos disponibles.
                    </Text>
                </Box>
            ) : (
                <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} gap={10}>
                    {productosDisponibles.map((producto) => (
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
                        >
                            <Flex justify="space-between" align="center" mb={2}>
                                <Box fontSize="xl" fontWeight="bold" color={colors.textPrimary}>
                                    {producto.title}
                                </Box>
                            </Flex>

                            <Center mb={4}>
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
