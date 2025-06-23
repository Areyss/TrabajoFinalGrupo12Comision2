import { Text, Box, Button, Center, Stack } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { TfiFaceSad } from "react-icons/tfi";
const ErrorPage = () => {
    return (
        <Center Center minH="70vh" px={4}>
            <Box p={6} textAlign="center">
                <Text fontSize="4xl" fontWeight="bold" mb={4}>
                    Error 404
                </Text>

                <Center m={5}>
                    <TfiFaceSad size={100}/>
                </Center>
                
                <Text fontSize="lg" color="gray.400" mb={6}>
                    La página que estás buscando no existe o puede haber sido removida.
                    Por favor, vuelve al inicio o verifica la URL.
                </Text>

                <Stack direction="column" align="center" spacing={4}>
                    <Button as={Link} to="/" colorScheme="blue" size="lg" boxShadow="md" _hover={{ transform: "scale(1.05)" }} borderRadius="full">
                        Volver al inicio
                    </Button>

                    <Text p={4} fontSize="sm" color="gray.500">
                        ¿Necesitas más información? Ponte en contacto con el administrador.
                    </Text>
                </Stack>
            </Box>
        </Center>
    );
};

export default ErrorPage;
