import {
    Box,
    SimpleGrid,
    Image,
    Link,
    Center,
    Text
} from "@chakra-ui/react";
import { useAppColors } from "../../theme/colors";
import { useColorModeValue } from "../components/ui/color-mode"
import products from "../data/products.json";

import {useProductos} from "../hooks/useProductos";
import { color } from "framer-motion";

const Home = () => {
    const colors = useAppColors();
    const { productos } = useProductos();
    return (
        
        <Box py={10} px={5}>
            <Text fontFamily={"sans-serif"} fontSize={30} mb={5} textAlign="center">Lista de productos</Text>
            <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} gap={10}>
                {products.map((producto) => (
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
                        <Box fontSize="xl" fontWeight="bold" color={colors.textPrimary} mb={2}>
                            {producto.nombre}
                        </Box>
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
                        <Box textAlign="center" fontSize="lg" fontWeight="semibold" color={colors.success}>
                            ${producto.precio.toFixed(2)}
                        </Box>
                    </Box>
                ))}
            </SimpleGrid>
        </Box>
    );
};

export default Home;
