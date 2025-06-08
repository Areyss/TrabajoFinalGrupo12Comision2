import { Outlet } from "react-router-dom"
import { Box, Flex, Container, Text, Center } from "@chakra-ui/react"
import Navbar from "./components/NavBar"
import { ColorModeButton } from "./components/ui/color-mode"
import { useAppColors } from "../theme/colors"

const App = () => {
  const colors = useAppColors();
  return (
    <Flex direction="column" minHeight="100vh">
      <Box as="header" bg={colors.primary} color="white" py={4} boxShadow="md">
        <Container>
          <Flex justifyContent='space-between'>
            <Center>
              <Text>LOGO</Text>
            </Center>
            <Flex align='center' gap="4">
              <Navbar />
              <ColorModeButton />
            </Flex>
          </Flex>
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
