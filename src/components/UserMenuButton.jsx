import { Button, Menu, Portal } from "@chakra-ui/react";
import { FaUser } from "react-icons/fa";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const UserMenuButton = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <Menu.Root>
      <Menu.Trigger asChild _hover={{ bg: "blue.500", color: "white" }}>
        <Button variant="outline" size="sm" ml={8}>
          <FaUser size={20} />
          {user?.username || "Sin autenticar"}
        </Button>
      </Menu.Trigger>
      <Portal>
        <Menu.Positioner>
          <Menu.Content>
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
  );
};

export default UserMenuButton;