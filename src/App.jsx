import { Outlet, useLocation, useNavigate } from "react-router-dom"
import { Box, Flex, Container, Text, Center } from "@chakra-ui/react"
import Navbar from "./components/NavBar"
import { ColorModeButton } from "./components/ui/color-mode"
import { useAppColors } from "../src/theme/colors"
import UserMenuButton from "./components/UserMenuButton"

const App = () => {
  const colors = useAppColors();
  const location = useLocation();
  const navigate = useNavigate();

  // Ocultar Navbar en la page del login
  const showNav = location.pathname !== "/login";

  return (
    <Flex direction="column" minHeight="100vh">

      <Box as="header" bg={colors.primary} color="white" boxShadow="md">
        <Container >
          <Flex justifyContent='space-between' py={2}>
            <Center onClick={() => navigate('/')} cursor="pointer">
              <Text>LOGO</Text>
            </Center>
            <Flex align='center'>
              <UserMenuButton />
              <ColorModeButton />
            </Flex>
          </Flex>
          {showNav && (
            <Navbar />
          )}
        </Container>
      </Box>
      

      <Box as="main" flex={1} py={5} bgColor={colors.bg}>
        <Container maxW="container.xl">
          <Outlet />
        </Container>
      </Box>

      <Box as="footer" bg={colors.footerBg} p={4} textAlign="center">
        <Text>© 2025 Facultad de Ingeniería - UNJu</Text>
      </Box>
    </Flex>
  )
}

export default App
