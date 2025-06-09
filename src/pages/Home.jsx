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


const Home = () => {
    const colors = useAppColors();
    const { productos } = useProductos();
    return (
        <Box py={10} px={5}>
            <Text fontFamily={"sans-serif"} fontSize={30} mb={5} textAlign="center">Lista de productos</Text>
            <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} gap={10}>
                {productos.map((producto) => (
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
                                {producto.nombre}
                            </Box>
                        </Flex>

                        <Center mb={4}>
                            <Link href={`producto-${producto.id}`} isExternal>
                                <Image
                                    src={producto.imagen}
                                    alt={producto.nombre}
                                    borderRadius="md"
                                    objectFit="cover"
                                    w="100%"
                                    h="200px"
                                />
                            </Link>
                        </Center>
                        <Box fontSize="md" color={colors.textSecondary} mb={3}>
                            {producto.descripcion}
                        </Box>
                        <Box textAlign="center" fontSize="lg" mb={4} fontWeight="semibold" color={colors.success}>
                            ${producto.precio.toFixed(2)}
                        </Box>
                        <Flex gap={3} wrap="wrap" justify="center">
                            <Button bg={useColorModeValue("yellow.500", "yellow.500")} size="sm">
                                Ver detalles
                            </Button>
                            <Button bg={useColorModeValue("blue.500", "blue.500")}  size="sm">
                                Editar
                            </Button>
                            <Button bg={useColorModeValue("red.500", "red.500")}  size="sm">
                                Eliminar
                            </Button>
                        </Flex>
                    </Box>
                ))}
            </SimpleGrid>
        </Box>
    );
};

export default Home;
