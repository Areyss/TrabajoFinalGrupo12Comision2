import { Box, Text, Button, Flex, Center, Image } from "@chakra-ui/react";
import { Link as RouterLink, useParams } from "react-router-dom";
import { useProductos } from "../hooks/useProductos";
import { useAppColors } from "../../theme/colors";
import { useColorModeValue } from "../components/ui/color-mode";
const DeleteButton = () => {
    const { id } = useParams();
    const { productos, deleteProducto } = useProductos();
    const colors = useAppColors();

    const producto = productos.find(p => p.id === parseInt(id));

    if (!producto) {
        return (
            <Box textAlign="center" mt={10} >
                <Text fontSize="xl" color="red.400">Producto no encontrado.</Text>
                <Button
                    as={RouterLink}
                    to="/"
                    mt={4}
                    bg={useColorModeValue("#3B4147", "gray.800")}
                    border="2px solid"
                    borderColor="gray.100"
                    color="gray.100"
                    _hover={{ transform: "scale(1.05)" }}
                >Volver</Button>
            </Box>
        );
    }
    return (
        <Box
            maxW="400px"
            mx="auto"
            mt={20}
            p={6}
            borderRadius="xl"
            boxShadow="lg"
            bg={useColorModeValue("#3B4147", "gray.800")}
            textAlign="center"
        >
            <Text fontSize="xl" fontWeight="bold" color={colors.textPrimary} mb={4}>
                ¿Estás seguro de que deseas eliminar "{producto.title}"?
            </Text>
            <Center mb={4}>
                <Image
                    src={producto.image}
                    alt={producto.title}
                    borderRadius="md"
                    objectFit="contain"
                    w="60%"
                    h="200px"
                    p={2}
                />
            </Center>
            <Flex justify="center" gap={4}>
                <Button
                    bg={useColorModeValue("#3B4147", "gray.800")}
                    border="2px solid"
                    borderColor="red.500"
                    color="red.500"
                    _hover={{ transform: "scale(1.05)" }}
                    onClick={() => deleteProducto(producto.id)}
                    as={RouterLink}
                    to="/"
                >
                    Sí
                </Button>
                <Button
                    bg={useColorModeValue("#3B4147", "gray.800")}
                    border="2px solid"
                    borderColor="gray.500"
                    color="gray.200"
                    _hover={{ transform: "scale(1.05)" }}
                    as={RouterLink}
                    to="/"
                >
                    No
                </Button>
            </Flex>
        </Box>
    );
};

export default DeleteButton;
