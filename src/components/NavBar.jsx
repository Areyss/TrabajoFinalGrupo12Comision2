import { HStack, Link, Box, Flex, Button, Center, Menu, Portal } from "@chakra-ui/react";
import { useLocation, NavLink as RouterLink, useNavigate} from "react-router-dom";
import { useAppColors } from "../theme/colors";
import { useAuth } from "../hooks/useAuth";

const NavBar = () => {
  const colors = useAppColors();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Función para saber si el link está activo
  const isActive = (to, exact = false) => {
    if (exact) {
      return location.pathname === to;
    }
    return location.pathname.startsWith(to);
  };
  return (
    <Box bg={colors.primary} >
      <Flex h={10} alignItems="center" justifyContent="center" maxW="100%" wrap="wrap">
        <HStack as="nav" gap={8} flex="1" justifyContent="center" color="gray.800"  align={"center"}>
          <Link
            as={RouterLink}
            to="/"
            end
            p={1.5}
            fontSize="lg"
            focusRingWidth="0px"
            fontWeight={isActive("/", true) ? "medium" : "normal"}
            color={isActive("/", true) ? colors.accent : undefined}
            borderBottom={isActive("/", true) ? "2px solid" : undefined}
            borderColor={isActive("/", true) ? colors.accent : undefined}
            _hover={{
              color: colors.accent,
              textDecoration: "none",
            }}
            
          >
            Inicio
          </Link>

          <Link
            as={RouterLink}
            to="/favoritos"
            end
            p={1.5}
            fontSize="lg"
            focusRingWidth="0px"
            fontWeight={isActive("/favoritos", true) ? "medium" : "normal"}
            color={isActive("/favoritos", true) ? colors.accent : undefined}
            borderBottom={isActive("/favoritos", true) ? "2px solid" : undefined}
            borderColor={isActive("/favoritos", true) ? colors.accent : undefined}
            _hover={{
              color: colors.accent,
              textDecoration: "none",  
            }}
          >
            Favoritos
          </Link>
        {/*
          <Link
            as={RouterLink}
            to="/productos"
            end
            p={1.5}
            fontSize="lg"
            focusRingWidth="0px"
            fontWeight={isActive("/productos", true) ? "medium" : "normal"}
            color={isActive("/productos", true) ? colors.accent : undefined}
            borderBottom={isActive("/productos", true) ? "2px solid" : undefined}
            borderColor={isActive("/productos", true) ? colors.accent : undefined}
            _hover={{
              color: colors.accent,
              textDecoration: "none",
            }}
          >
            Productos
          </Link>
        */}
          {user?.rol === "administrador" && (
            <Link
              as={RouterLink}
              to="/productos/crear"
              p={1.5}
            fontSize="lg"
            focusRingWidth="0px"
            fontWeight={isActive("/productos/crear", true) ? "medium" : "normal"}
            color={isActive("/productos/crear", true) ? colors.accent : undefined}
            borderBottom={isActive("/productos/crear", true) ? "2px solid" : undefined}
            borderColor={isActive("/productos/crear", true) ? colors.accent : undefined}
            _hover={{
              color: colors.accent,
              textDecoration: "none",
            }}
            >
              Crear Producto
            </Link>
          )}

          <Link
            as={RouterLink}
            to="/about"
            end
            p={1.5}
            fontSize="lg"
            focusRingWidth="0px"
            fontWeight={isActive("/about", true) ? "medium" : "normal"}
            color={isActive("/about", true) ? colors.accent : undefined}
            borderBottom={isActive("/about", true) ? "2px solid" : undefined}
            borderColor={isActive("/about", true) ? colors.accent : undefined}
            _hover={{
              color: colors.accent,
              textDecoration: "none",
            }}
          >
            Acerca de
          </Link>
        </HStack>
      </Flex>
    </Box>
  );
};

export default NavBar;
