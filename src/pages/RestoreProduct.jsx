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
        <Box py={10} px={5}>
            <Flex
                justify="space-between"
                align="center"
                mx="auto"
                mb={5}
            >
                <Box flex="1" textAlign="center" >
                    <Text fontFamily="sans-serif" fontSize={30}>
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
                            bg={useColorModeValue("#3B4147", "gray.800")}
                            p={6}
                            borderRadius="xl"
                            boxShadow="lg"
                            _hover={{ boxShadow: "xl", transform: "scale(1.02)", transition: "0.3s" }}
                            textAlign="center" 
                        >
                            <Text fontSize="xl" fontWeight="bold" color={colors.textPrimary} mb={4}>
                                {producto.title}
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
                           
                            <Text fontSize="lg" fontWeight="semibold" color={colors.success} mb={4}>
                                ${producto.price.toFixed(2)}
                            </Text>

                            <Button
                                bg={useColorModeValue("#3B4147", "gray.800")}
                                border="2px solid"
                                borderColor="green.500"
                                color="green.500"
                                _hover={{ transform: "scale(1.05)" }}
                                size="lg"
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