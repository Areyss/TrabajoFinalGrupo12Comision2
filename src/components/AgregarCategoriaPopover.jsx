import { Popover, Portal, Button, Field, Input, Stack } from "@chakra-ui/react";
import { useState } from "react";

const AgregarCategoriaPopover = ({ onAdd }) => {
  const [nuevaCategoria, setNuevaCategoria] = useState("");
  const [open, setOpen] = useState(false);

  const handleAdd = () => {
    if (nuevaCategoria.trim() !== "") {
      onAdd(nuevaCategoria.trim());
      setNuevaCategoria("");
      setOpen(false); // Cierra el popover al guardar
    }
  };

  const handleCancel = () => {
    setNuevaCategoria("");
    setOpen(false); // Cierra el popover al cancelar
  };

    return (
        <Popover.Root open={open} onOpenChange={setOpen} positioning={{ placement: "bottom-end" }} modal={true}>
            <Popover.Trigger asChild>
                <Button
                    size="sm"
                    variant="outline"
                    aria-label={open ? "Cerrar" : "Agregar categoría"}
                >
                    ➕
                </Button>
            </Popover.Trigger>
            <Portal>
                <Popover.Positioner>
                    <Popover.Content>
                        <Popover.Arrow />
                        <Popover.Body>
                            <Stack gap="4">
                                <Field.Root>
                                    <Field.Label>Nueva categoría</Field.Label>
                                    <Input
                                        size="sm"
                                        placeholder="Nombre de la categoría"
                                        value={nuevaCategoria}
                                        onChange={e => setNuevaCategoria(e.target.value)}
                                    />
                                </Field.Root>
                                <Stack direction="row" gap={2}>
                                    <Button size="sm" onClick={handleAdd}>
                                        Agregar
                                    </Button>
                                    <Button size="sm" variant="outline" onClick={handleCancel}>
                                        Cancelar
                                    </Button>
                                </Stack>
                            </Stack>
                        </Popover.Body>
                    </Popover.Content>
                </Popover.Positioner>
            </Portal>
        </Popover.Root>
    );
};

export default AgregarCategoriaPopover;