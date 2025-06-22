import {
  Stat,
  HStack,
  Badge,
  FormatNumber,
  Box,
  GridItem,
  SimpleGrid,
  Center,
} from "@chakra-ui/react";

const StatsResumen = () => {
  return (
    <Center>
      <SimpleGrid columns={[1, 3, 3]} gap={{ base: "24px", md: "200px" }}>
        <GridItem>
          <Stat.Root>
            <Stat.Label>Productos activos</Stat.Label>
            <Stat.ValueText>
              <FormatNumber value={31249} />
            </Stat.ValueText>
            <Stat.HelpText>actualizado hoy</Stat.HelpText>
          </Stat.Root>

        </GridItem>


        <Stat.Root>
          <Stat.Label>Clientes</Stat.Label>
          <HStack>
            <Stat.ValueText>
              <FormatNumber value={8456} />
            </Stat.ValueText>
            <Badge colorPalette="green" gap="0">
              <Stat.UpIndicator />
              12%
            </Badge>
          </HStack>
          <Stat.HelpText>desde el mes pasado</Stat.HelpText>
        </Stat.Root>

        <Stat.Root>
          <Stat.Label>Entregas a tiempo</Stat.Label>
          <Stat.ValueText>
            <FormatNumber value={0.97} style="percent" />
          </Stat.ValueText>
          <Stat.HelpText>nivel nacional</Stat.HelpText>
        </Stat.Root>
      </SimpleGrid>
    </Center>

  );
};

export default StatsResumen;
