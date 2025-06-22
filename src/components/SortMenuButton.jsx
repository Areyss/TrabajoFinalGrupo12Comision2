import { Button, Menu, Portal } from "@chakra-ui/react";
import { FaSort } from "react-icons/fa";

const SortMenuButton = ({ sortType, setSortType }) => {

  const handleSort = (type) => {
    setSortType(type);
  };

  return (
    <Menu.Root>
      <Menu.Trigger asChild>
        <Button variant="outline" size="sm" mr={2}>
            <FaSort />
            {sortType}        
        </Button>
      </Menu.Trigger>
      <Portal>
        <Menu.Positioner>
          <Menu.Content>
            <Menu.Item onClick={() => handleSort("precio-mayor")}>
              Mayor Precio
            </Menu.Item>
            <Menu.Item onClick={() => handleSort("precio-menor")}>
              Menor Precio
            </Menu.Item>
            <Menu.Item onClick={() => handleSort("Valoración")}>
              Valoración
            </Menu.Item>
          </Menu.Content>
        </Menu.Positioner>
      </Portal>
    </Menu.Root>
  );
};

export default SortMenuButton;