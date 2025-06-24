import { Box, SimpleGrid, Image, Center, Text, Button, Flex, Link } from "@chakra-ui/react";
import { BiArrowBack } from "react-icons/bi";
import { useAppColors } from "../theme/colors";
import { useProductos } from "../hooks/useProductos";
import { useColorModeValue } from "../components/ui/color-mode";
import { Link as RouterLink } from "react-router-dom";

const RestoreProducts = () => {
    const { productos, restoreProducto } = useProductos();
    const colors = useAppColors();
    const productosEliminados = productos.filter(p => !p.disponible);
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
                        Papelera
                    </Text>
                </Box>
                <Button as={RouterLink} to="/">
                    <BiArrowBack size={30} />
                </Button>

            </Flex>


            {/*Si no hay productos disponibles, mostrar mensaje */}
            {productosEliminados.length === 0 ? (
                <Box textAlign="center" mt={10} >
                    <Text fontSize="xl" color="gray.400">
                        No hay productos eliminados.
                    </Text>
                </Box>
            ) : (
                <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} gap={10}>
                    {productosEliminados.map((producto) => (
                        <Box
                            key={producto.id}
                            bg={colors.bgPrimary}
                            borderRadius="xl"
                            boxShadow="lg"
                            _hover={{ boxShadow: "xl", transform: "scale(1.02)", transition: "0.3s" }}
                            textAlign="center" 
                            overflow={"hidden"}
                        >
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
                            <Text fontSize="xl" fontWeight="bold" color={colors.textColor} mt={4}>
                                {producto.title}
                            </Text>                
                           
                            <Text fontSize="lg" fontWeight="semibold" color={colors.success} mb={4}>
                                ${producto.price.toFixed(2)}
                            </Text>

                            <Button
                                bg={colors.bgCard}
                                border="2px solid"
                                borderColor={colors.success}
                                color={colors.success}
                                _hover={{ transform: "scale(1.05)" }}
                                size="lg"
                                mb={4}
                                onClick={() => restoreProducto(producto.id)}
                            >
                                Restaurar
                            </Button>
                        </Box>
                    ))}
                </SimpleGrid>
            )}
        </Box>
    );
};

export default RestoreProducts;