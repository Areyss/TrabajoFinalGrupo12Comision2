import { Box, Flex, Image, Text, Button } from "@chakra-ui/react";
import FavoriteButton from "./FavoriteButton";

const CardProductList = ({
  producto,
  colors,
  user,
  onVerDetalles,
  onEditar,
  onEliminar,
  onToggleFavorito
}) => (
  <Flex
    key={producto.id}
    bg={colors.secondary}
    borderRadius="xl"
    boxShadow="lg"
    h="250px"
    align="center"
    gap={6}
    position="relative"
    _hover={{
      boxShadow: "xl",
      transform: "scale(1.01)",
      transition: "0.3s",
    }}
    overflow={"hidden"}
  >
    <Box w="20%" h="100%" p="5" display="flex" alignItems="center" justifyContent="center" bg="white" borderRadius="md" overflow="hidden">
      <Image
        src={producto.image}
        alt={producto.title}
        objectFit="contain"
        w="100%"
        h="100%"
      />
    </Box>
    <Box flex="1"gap="5" pr="5">
      <Text fontSize="xl" fontWeight="bold" lineClamp={1} color={colors.text}>{producto.title}</Text>
      <Text fontSize="md" color={colors.textSecondary} mb={2}>{producto.category}</Text>
      <Text fontSize="md" color={colors.textColor} mb={2} lineClamp={2}>{producto.description}</Text>
      <Text fontSize="2xl" fontWeight="semibold" color={colors.success} mb={2}>
        ${producto.price.toFixed(2)}
      </Text>
      <Flex gap={2} mt={2}>
        <Button size="sm"  onClick={onVerDetalles}>Ver detalles</Button>
        {user?.rol === "administrador" && (
          <>
            <Button size="sm"  onClick={onEditar}>Editar</Button>
            <Button size="sm" onClick={onEliminar}>Eliminar</Button>
          </>
        )}
      </Flex>
    </Box>
    <FavoriteButton
                isFavorite={producto.favorito}
                onToggle={onToggleFavorito}
            />
  </Flex>
);

export default CardProductList;