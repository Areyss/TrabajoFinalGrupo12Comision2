import {
  Box,
  Heading,
  Text,
  SimpleGrid,
  Image,
  VStack,
  Button,
  Link,
  Icon,
  Avatar,
  Flex
} from "@chakra-ui/react";
import { FaGithub } from "react-icons/fa";
import creadores from "../data/developers.json";
import { useAppColors } from "../theme/colors";
import Comentarios from "../data/comments.json";
const AboutUs = () => {
  const colors = useAppColors();
  return (
    <Box maxW="1000px" mx="auto" px={6} py={10}>
      <Heading fontFamily={"sans-serif"} fontSize={"30px"} textAlign="center" mb={6}>Sobre Nosotros</Heading>

      {/* Descripcion */}
      <VStack spacing={4} gap={5} mb={"15px"}>
        <Box textAlign={"center"}>
          <Heading fontSize={"20px"} fontWeight="bold" color={colors.primary}>Nuestra Misión</Heading>
          <Text>
            En <strong>OnlineStore</strong> trabajamos para acercar productos de calidad a todas las personas, manteniendo siempre precios justos. Nos enfocamos en ofrecer una atención cercana y soluciones eficientes, para que cada compra sea una experiencia positiva y sin complicaciones.
          </Text>
        </Box>
        <Box textAlign={"center"}>
          <Heading fontSize={"20px"} fontWeight="bold" color={colors.primary} >Nuestra Visión</Heading>
          <Text>
            Queremos posicionarnos como una tienda online de nivel nacional. Aspiramos a crecer junto a nuestros clientes, incorporando tecnología, mejorando nuestros servicios y expandiendo nuestra oferta para satisfacer las necesidades de todos los hogares.
          </Text>
        </Box>
      </VStack>

      {/* Equipo */}
      <SimpleGrid columns={[1, 2]} spacing={6} mb={10}>
        {creadores.map((persona) => (
          <Box key={persona.id} borderWidth="1px" borderRadius="md" p={4} boxShadow="md">
            <Image
              src={persona.foto}
              alt={persona.nombreCompleto}
              borderRadius="full"
              boxSize="100px"
              objectFit="cover"
              mx="auto"
              mb={4}
            />
            <VStack spacing={2}>
              <Heading size="md">{persona.nombreCompleto}</Heading>
              <Text color="gray.500">{persona.rol}</Text>
              <Text textAlign="center">{persona.descripcion}</Text>
              <Link href={persona.contacto} isExternal>
                <Icon as={FaGithub} boxSize={6} />
              </Link>
            </VStack>
          </Box>
        ))}
      </SimpleGrid>

      {/* Comentario de usuarios*/}
      <Box mt={10}>
        <Text m={"10px"} fontSize={"20px"} fontFamily={"sans-serif"}>Comentario de nuestros clientes: </Text>
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6} gap={"20px"}>
          {Comentarios.map((cliente) => (
            <Box
              key={cliente.id}
              p={4}
              shadow="md"
              borderWidth="1px"
              borderRadius="md"
            >
              <Flex align="center" gap={4} mb={3}>
                <Avatar.Root>
                  <Avatar.Fallback name={cliente.nombre} />
                  <Avatar.Image src={cliente.avatar} />
                </Avatar.Root>
                <Text fontWeight="bold">{cliente.nombre}</Text>
              </Flex>
              <Text fontStyle="italic">"{cliente.comentario}"</Text>
            </Box>
          ))}
        </SimpleGrid>
      </Box>

      {/* App */}
      <Box textAlign="center" mt={10}>
        <Image
          src="/public/qr.svg"
          alt="Descargá nuestra app"
          mx="auto"
          borderRadius="md"
          mb={2}
          maxW="200px"
        />
        <Heading size="md" mb={2}>¡Descargá nuestra app!</Heading>
        <Text mb={4}>
          Llevá nuestra tienda a donde vayas. Comprá, revisá tu carrito y seguí tus pedidos desde el celular.
        </Text>
        <Text color={colors.textSecondary}> Proximamente en IOS</Text>
      </Box>
    </Box>
  );
};

export default AboutUs;
