import { HStack, Link, Box, Flex } from "@chakra-ui/react";
import { NavLink as RouterLink } from "react-router-dom";
import { useAppColors } from "../theme/colors";
const NavBar = () => {
  const colors = useAppColors();
  return (
    <Box bg={colors.primary} px={4}>
      <Flex h={16} alignItems="center" justifyContent="center" maxW="1200px" mx="auto">
        <HStack as="nav" spacing={8} color="gray.800">
          <Link
            as={RouterLink}
            to="/"
            end
            p={2}
            fontSize="lg"
            fontWeight="medium"
            _activeLink={{
              color: colors.accent,
              borderBottom: "2px solid",
              borderColor: colors.accent,
            }}
            _hover={{
              textDecoration: "none",
              color: colors.accent,
            }}
          >
            Inicio
          </Link>

          <Link
            as={RouterLink}
            to="/favoritos"
            end
            p={2}
            fontSize="lg"
            fontWeight="medium"
            _activeLink={{
              color: "blue.500",
              borderBottom: "2px solid",
              borderColor: "blue.500",
            }}
            _hover={{
              textDecoration: "none",
              color: "blue.500",
            }}
          >
            Favoritos
          </Link>

          <Link
            as={RouterLink}
            to="/productos"
            end
            p={2}
            fontSize="lg"
            fontWeight="medium"
            _activeLink={{
              color: "blue.500",
              borderBottom: "2px solid",
              borderColor: "blue.500",
            }}
            _hover={{
              textDecoration: "none",
              color: "blue.500",
            }}
          >
            Productos
          </Link>

          <Link
            as={RouterLink}
            to="/productos/crear"
            p={2}
            fontSize="lg"
            fontWeight="medium"
            _activeLink={{
              color: "blue.500",
              borderBottom: "2px solid",
              borderColor: "blue.500",
            }}
            _hover={{
              textDecoration: "none",
              color: "blue.500",
            }}
          >
            Crear Producto
          </Link>

          <Link
            as={RouterLink}
            to="/about"
            end
            p={2}
            fontSize="lg"
            fontWeight="medium"
            _activeLink={{
              color: "blue.500",
              borderBottom: "2px solid",
              borderColor: "blue.500",
            }}
            _hover={{
              textDecoration: "none",
              color: "blue.500",
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
