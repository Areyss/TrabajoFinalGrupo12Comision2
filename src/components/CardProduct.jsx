import { Box, Image, Center, Flex, Button, IconButton, Text ,Stack} from "@chakra-ui/react";
import { LuHeart } from "react-icons/lu";
import { Link as RouterLink } from "react-router-dom";

const CardProduct = ({
  producto,
  colors,
  user,
  onVerDetalles,
  onEditar,
  onEliminar,
  onToggleFavorito
}) => {
    return (
        <Box 
            as = {RouterLink}
            to={`/productos/${producto.id}`}
            key={producto.id}
            bg={colors.secondary}
            
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

            <IconButton
                aria-label="Favorite"
                rounded="full"
                position="absolute"
                top={1}
                right={1}
                color={colors.gray}
                opacity={0.9}
                variant="ghost"
                size="xl"
                onClick={e => {
                    e.stopPropagation();
                    e.preventDefault();
                    onToggleFavorito();
                }}
            >
                {producto.favorito ? <Box fontSize="lg" position="absolute" top={2}>❤️</Box> : <LuHeart />}
            </IconButton>

            <Flex justify="space-between" flexDirection={"column"} px={6} py={1} gap={1}>
                <Text fontSize="xl" fontWeight="medium" color={colors.text} lineClamp={2} lineHeight={1.2} minH={50}>
                    {producto.title}
                </Text>

                <Text textAlign="start" fontSize="3xl"  fontWeight="semibold" color={colors.success}>
                    ${producto.price.toFixed(2)}
                </Text>
                
                
                <Flex gap={3} wrap="wrap" justify="center" mb="4">

                    {user?.rol === "administrador" && (
                        <>
                            <Button
                                bg={colors.bgCard}
                                border="2px solid"
                                borderColor="blue.500"
                                color="blue.500"
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
                                borderColor="red.500"
                                color="red.500"
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