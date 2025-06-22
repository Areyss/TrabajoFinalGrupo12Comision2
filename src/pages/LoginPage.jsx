import {
  Box,
  Button,
  Flex,
  Heading,
  Image,
  Input,
  Text,
  VStack,
  InputGroup,
  Link,
  Center
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useAppColors } from "../theme/colors";
import { FaRegUser } from "react-icons/fa";
import { RiLockPasswordLine } from "react-icons/ri";
import StatsResumen from "../components/StatsResumen";

const LoginPage = () => {
  const { login, errorLogin } = useAuth();
  const navigate = useNavigate();
  const colors = useAppColors();

  return (
    <>
      <Flex
        direction={{ base: "column", md: "row" }}
        align="center"
        justify="center"
      
      >
        {/* Columna izquierda */}
        <Flex direction="column" mt={10} flex="1" justify="space-between">
          <Box >
            <Heading  fontSize={{ base: "3xl", md: "5xl" }} mb={10}>
              Bienvenido a{" "}
              <Text as="span" color="green.500">
                OnlineStore
              </Text>
            </Heading>
            <Text fontSize="lg" mb={6}>
              Iniciá sesión para acceder a nuestros productos exclusivos. Tenemos
              lo que estás buscando, ¡al mejor precio!
            </Text>
            <Image
              src="/login/app-login.jpg"
              alt="Imagen temporal"
              borderRadius="md"
              w="60%"
              mx={"auto"}
            />
          </Box>
          <Box mt={{ base: 3, md: 10 }} >
              <StatsResumen />
          </Box>
        </Flex>
        {/* Columna derecha: Login */}
        <Flex flex="0 0 400px" align="center" justify="center">
          <Box
            w="100%"
            p={5}
            borderWidth="1px"
            borderRadius="md"
            boxShadow="lg"
            bg={colors.secondary}
          >
            <Heading as="h2" size="lg" mb={4}>
              Iniciar sesión
            </Heading>

            <form onSubmit={login(navigate)}>
              <VStack spacing={4} gap={4}>
                <InputGroup startElement={<FaRegUser />}>
                  <Input
                    id="username"
                    name="username"
                    placeholder="Nombre de usuario"
                    color={colors.gray}
                    type="text"
                    bg="white"
                  />
                </InputGroup>

                <InputGroup startElement={<RiLockPasswordLine />}>
                  <Input
                    id="password"
                    name="password"
                    placeholder="Contraseña"
                    color={colors.gray}
                    type="password"
                    bg="white"
                  />
                </InputGroup>
                {errorLogin && (
                  <Text color="red.500" fontSize="sm" alignSelf="start">
                    {errorLogin}
                  </Text>
                )}
                <Button bg={colors.primary}
                  color={colors.textPrimary}
                  _hover={{
                    bg: colors.primaryHover ?? colors.primaryHover,
                    transform: "scale(1.02)",
                  }}
                  width="100%"
                  type="submit">
                  Ingresar
                </Button>
                <Text fontSize="sm" color={colors.textColor} mt={1}>
                  ¿No tenés cuenta?{" "}
                  <Link color={colors.primary} href="/" fontWeight="medium">
                    Contactanos
                  </Link>{" "}
                  para solicitar acceso.
                </Text>
              </VStack>
            </form>
          </Box>
        </Flex>

      </Flex>

    </>

  );
};

export default LoginPage;
