import { HStack, Link, Box, Flex, Button, Center, Menu, Portal } from "@chakra-ui/react";
import { NavLink as RouterLink, useNavigate} from "react-router-dom";
import { useAppColors } from "../theme/colors";
import { FaUser } from "react-icons/fa";
import { useAuth } from "../hooks/useAuth";

const NavBar = () => {
  const colors = useAppColors();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  return (
    <Box bg={colors.primary} px={4}>
      <Flex h={16} alignItems="center" justifyContent="center" maxW="1200px" mx="auto" wrap="wrap">
        <HStack as="nav" spacing={8} flex="1" justifyContent="center" color="gray.800">
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
        {/*
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
        */}
          {user?.rol === "administrador" && (
            <Link
              as={RouterLink}
              to="/productos/crear"
              p={2}
              fontSize="lg"
              fontWeight="medium"
              _activeLink={{ color: "blue.500", borderBottom: "2px solid", borderColor: "blue.500" }}
              _hover={{ textDecoration: "none", color: "blue.500" }}
            >
              Crear Producto
            </Link>
          )}

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
        <Center>
          <Menu.Root >
            <Menu.Trigger asChild _hover={{ bg: "blue.500", color: "white" }}>
              <Button variant="outline" size="sm" ml={8} >
                <FaUser size={20} />
                {user?.username || "Sin autenticar"}
              </Button>
            </Menu.Trigger>
            <Portal>
              <Menu.Positioner>
                <Menu.Content >
                  <Menu.Item>Rol: {user?.rol || "Sin autenticar"}</Menu.Item>
                  {user && (
                    <>
                      <Menu.Item>Nombre: {user.name}</Menu.Item>
                      <Menu.Item
                        value="logout"
                        onClick={() => {
                          logout();
                          navigate("/login");
                        }}
                      >
                        Cerrar sesión
                      </Menu.Item>
                    </>
                  )}
                </Menu.Content>
              </Menu.Positioner>
            </Portal>
          </Menu.Root>
        </Center>
      </Flex>
    </Box>
  );
};

export default NavBar;
