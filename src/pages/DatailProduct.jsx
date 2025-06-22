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
import FavoriteButton from "../components/FavoriteButton";

const DetailProduct = () => {
    const { id } = useParams();
    const { productos, toggleFavorito } = useProductos();
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
        <Center py={5} >
            <Box
                bg={colors.secondary}
                color={colors.text}
                maxW="80%"
                w="full"
                borderRadius="xl"
                boxShadow="2xl"
                overflow="hidden"
                p={6}
            >


                <Flex
                    direction={{ base: "column", md: "row" }}
                    align="flex-start"
                    justify="flex-start"
                    gap={6}
                >
                    <Box height="100%" minH="350px" width="50%" bg="white" borderRadius="lg" overflow="hidden">
                        <Image
                            src={producto.image}
                            alt={producto.title}
                            borderRadius="lg"
                            objectFit="contain"
                            w="100%"
                            h="100%"
                            maxH="500px"
                            p={10}
                            bg="white"
                        />
                    </Box>


                    <Stack gap="1" textAlign="center" flex="1" border="1px solid" borderColor="gray.300" p={6} borderRadius="lg" height="100%" minH={"500px"} position={"relative"}>
                        <FavoriteButton
                            isFavorite={producto.favorito}
                            onToggle={() => toggleFavorito(producto.id)}
                        />
                        <Text textAlign="start" fontSize="md" color="gray.400">
                            Categoría: {producto.category}
                        </Text>
                        <Heading textAlign="start" fontWeight="bold" mb="2" fontSize="3xl" lineHeight={1.2}>
                            {producto.title}
                        </Heading>
                        <Stack align="center" direction="row" justify="flex-start" gap={4} pl="1">
                            <Text fontSize="md" color="gray.400">
                                ({producto.rating?.rate})
                            </Text>
                            <ProductRating rate={producto?.rating?.rate} />
                            <Text color="gray.500">
                                {producto?.rating?.count} valoraciones
                            </Text>
                        </Stack>
                        <Text textAlign="start" fontSize="5xl" fontWeight="bold" color="green.400">
                            ${producto.price.toFixed(2)}
                        </Text>
                        <Text fontSize="lg" color="gray.400" justifyContent="justify" textAlign="start" >
                            {producto.description}
                        </Text>


                        {/* Agregar más información */}


                        <Box justifyContent={"center"} fontSize="md" color="gray.400" mt="auto">
                            Número de comentarios: {producto.rating?.count}
                        </Box>
                    </Stack>
                </Flex>

                <Center mt={8}>
                    <Button
                        as={Link}
                        to={-1}
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
