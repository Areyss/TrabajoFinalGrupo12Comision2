import { useState } from "react";
import { Box, Button, Heading, Input, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const LoginPage = () => {
  const { handleSubmit, errorLogin } = useAuth();
  const navigate = useNavigate();


  return (
    <Box maxW="400px" m="0 auto" p="6" borderWidth="1px" borderRadius="md" boxShadow="md">
      <Heading as="h2" size="lg" mb="4">
        ¡Bienvenido!
      </Heading>

      <form onSubmit={handleSubmit(navigate)}>
        <Box mb="4">
          <Input
            id="username"
            name="username"
            placeholder="Usuario"
            type="text"
            
          />
        </Box>

        <Box mb="4">
          <Input
             id="password"
            name="password"
            placeholder="Contraseña"
            type="password"
            
          />
        </Box>
        {errorLogin && (
          <Text color="red.500" mb="4">
            {errorLogin}
          </Text>
        )}
        <Button colorScheme="blue" width="100%" type="submit">
          Ingresar
        </Button>
      </form>
    </Box>
  )
};

export default LoginPage;
