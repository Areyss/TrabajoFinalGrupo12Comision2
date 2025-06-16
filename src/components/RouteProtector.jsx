import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { Spinner, Stack } from "@chakra-ui/react"

const RouteProtector = ({ rolesPermitidos, children }) => {
    const { user, isLoading, isAuthenticated } = useAuth();

    // Verificar si el usuario tiene un rol permitido
    if(isLoading) {
        return (
            <Stack>
                <Spinner
                size="xl"
                thickness="4px"
                speed="0.65s"
                color="blue.500"
                position="fixed"
                top="50%"
                left="50%"
                transform="translate(-50%, -50%)"
            />
                <Text fontSize="xl" textAlign="center" color="gray.500">
                    Cargando...
                </Text>
            </Stack>
            
        );
    }


    // Si el usuario no está autenticado, redirigir a la página de inicio de sesión
    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    // Si hay roles permitidos, verificar si el usuario tiene un rol permitido
    if(rolesPermitidos && !rolesPermitidos.includes(user.rol)) {
        return <Navigate to="/unauthorized" replace />;
    }

    return children; // Renderizar los hijos si el usuario está autenticado
}

export default RouteProtector;