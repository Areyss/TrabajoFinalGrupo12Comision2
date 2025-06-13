import {
    Box,
    Heading,
    Flex,
    Image,
    Text,
    Stack,
    Button,
    Center,
} from "@chakra-ui/react";
import { Link, useParams } from "react-router-dom";
import { useProductos } from "../hooks/useProductos";
import { useAppColors } from "../theme/colors";
import ProductRating from "../components/ProductRating";
import { useColorModeValue } from "../components/ui/color-mode";

const DetailProduct = () => {
    const { id } = useParams();
    const { productos } = useProductos();
    const colors = useAppColors();
    const producto = productos.find((p) => p.id === parseInt(id));

    if (!producto) {
        return (
            <Center minH="60vh">
                <Text fontSize="xl" color="gray.400">
                    Producto no encontrado.
                </Text>
            </Center>
        );
    }

    return (
        <Center py={10}>
            <Box
                bg={useColorModeValue("#3B4147", "gray.800")}
                color="white"
                maxW="800px"
                w="full"
                borderRadius="xl"
                boxShadow="2xl"
                overflow="hidden"
                p={6}
            >
                <Heading textAlign="center" fontWeight="bold" mb={6} fontSize="3xl">
                    {producto.title}
                </Heading>

                <Flex
                    direction={{ base: "column", md: "row" }}
                    align="center"
                    justify="center"
                    gap={6}
                >
                    <Image
                        src={producto.image}
                        alt={producto.title}
                        borderRadius="lg"
                        objectFit="contain"
                        w={{ base: "100%", md: "40%" }}
                        h="auto"
                        p={2}
                        bg="#1A202C"
                    />

                    <Stack spacing={5} textAlign="center" flex="1">
                        <Text fontSize="lg" color="gray.300">
                            {producto.description}
                        </Text>

                        <Text fontSize="2xl" fontWeight="bold" color="green.400">
                            ${producto.price.toFixed(2)}
                        </Text>

                        {/* Agregar más información */}
                        <Text fontSize="md" color="gray.400">
                            Categoría: {producto.category}
                        </Text>
                        <Center>
                            <ProductRating rate={producto?.rating?.rate} />
                        </Center>

                        <Text color="gray.500">
                            {producto?.rating?.count} valoraciones
                        </Text>

                        <Flex justifyContent={"center"} fontSize="md" color="gray.400">
                            Número de comentarios: {producto.rating?.count}
                        </Flex>
                    </Stack>
                </Flex>

                <Center mt={8}>
                    <Button
                        as={Link}
                        to="/"
                        bg={useColorModeValue("#3B4147", "gray.800")}
                        border="2px solid"
                        borderColor="blue.500"
                        color="blue.500"
                        _hover={{ transform: "scale(1.05)" }}
                        size="lg"
                        px={8}
                        borderRadius="full"
                        boxShadow="md"

                    >
                        Volver al inicio
                    </Button>
                </Center>
            </Box>
        </Center>
    );
};

export default DetailProduct;
