import { Box, Image, Center, Flex, Button, Text } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import FavoriteButton from "./FavoriteButton";

const CardProduct = ({
  producto,
  colors,
  user,
  onEditar,
  onEliminar
}) => {
    return (
        <Box 
            as = {RouterLink}
            to={`/productos/${producto.id}`}
            key={producto.id}
            bg={colors.bgPrimary}
            
            borderRadius="xl"
            boxShadow="lg"
            _hover={{
                boxShadow: "xl",
                transform: "scale(1.02)",
                transition: "0.3s",
            }}
            position="relative"
            overflow={"hidden"}
        >
            <Center mb={4} padding="5" border="1px solid" borderColor={colors.secondary} bg="white"  overflow="hidden">
                <Image
                    src={producto.image}
                    alt={producto.title}
                    borderRadius="md"
                    fit="contain"
                    w="100%"
                    h="220px"
                />
            </Center>

            <FavoriteButton 
                productoId={producto.id}
            />

            <Flex justify="space-between" flexDirection={"column"} px={6} py={1} gap={1}>
                <Text fontSize="xl" fontWeight="medium" color={colors.text} lineClamp={2} lineHeight={1.2} minH={50}>
                    {producto.title}
                </Text>

                <Text textAlign="start" fontSize="3xl"  fontWeight="semibold" color={colors.success}>
                    ${producto.price.toFixed(2)}
                </Text>
                
                
                <Flex gap={3} wrap="wrap" justify="end" mb="4">

                    {user?.rol === "administrador" && (
                        <>
                            <Button
                                bg={colors.bgCard}
                                border="2px solid"
                                borderColor={colors.info}
                                color={colors.info}
                                size="sm"
                                boxShadow="md"
                                _hover={{ transform: "scale(1.05)" }}
                                onClick={e => {
                                    e.stopPropagation();
                                    e.preventDefault();
                                    onEditar();
                                }}
                            >
                                Editar
                            </Button>
                            <Button
                                bg={colors.bgCard}
                                border="2px solid"
                                borderColor={colors.danger}
                                color={colors.danger}
                                size="sm"
                                boxShadow="md"
                                _hover={{ transform: "scale(1.05)" }}
                                onClick={e => {
                                    e.stopPropagation();
                                    e.preventDefault();
                                    onEliminar();
                                }}
                            >
                                Eliminar
                            </Button>
                        </>
                    )}
                </Flex>
            </Flex>
        </Box>
    );
}

export default CardProduct;