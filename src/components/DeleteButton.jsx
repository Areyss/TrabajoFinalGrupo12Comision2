import { Box, Text, Button, Flex, Center, Image } from "@chakra-ui/react";
import { Link as RouterLink, useParams } from "react-router-dom";
import { useProductos } from "../hooks/useProductos";
import { useAppColors } from "../theme/colors";
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
        <Box maxW="450px" mx="auto" mt={20} borderRadius="xl" boxShadow="lg" bg={colors.secondary} textAlign="center" overflow={"hidden"}>
            <Center p={4} border="1px solid" borderColor={colors.secondary} bg="white">
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

            <Text fontSize="xl" fontWeight="semiBold" color={colors.text} mt={4}>
                ¿Estás seguro de que deseas eliminar "{producto.title}"?
            </Text>

            <Flex justify="center" gap={4} padding={4}>
                <Button
                    bg={colors.bgCard}
                    border="2px solid"
                    borderColor={colors.danger}
                    color={colors.danger}
                    _hover={{ transform: "scale(1.05)" }}
                    onClick={() => deleteProducto(producto.id)}
                    as={RouterLink}
                    to="/"
                >
                    Sí
                </Button>

                <Button
                    bg={colors.bgCard}
                    border="2px solid"
                    borderColor={colors.gray}
                    color={colors.gray}
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
