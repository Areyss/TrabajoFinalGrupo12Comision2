import { Button, Box, Field, Input, InputGroup, Stack, Tabs, Textarea, Portal, Select, createListCollection, IconButton } from '@chakra-ui/react';
import { useState } from 'react';
import { useProductos } from '../hooks/useProductos';
import { useNavigate } from 'react-router-dom';

const ProductsForm = () => {
    // Importa el hook useProductos para acceder a las funciones y estados del contexto
    const { addProducto, categorias, addCategoria } = useProductos();

    const navigate = useNavigate();
    // Estados para manejar la imagen (opcional)
    // const [imageType, setImageType] = useState('link');
    // const [imageLink, setImageLink] = useState('');
    // const [imageFile, setImageFile] = useState(null);

    // Estados locales para los campos
    const [nombre, setNombre] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [precio, setPrecio] = useState('');
    const [categoria, setCategoria] = useState([]);
    const [imagen, setImagen] = useState('');
    // Estado para manejar la nueva categoría
    const [nuevaCategoria, setNuevaCategoria] = useState('');
    const [showAddCategoria, setShowAddCategoria] = useState(false);

    // Adaptar categorías al formato que espera createListCollection
    const categoriasCollection = createListCollection({
        items: categorias.map(cat => ({
            label: cat.nombre,
            value: String(cat.nombre)
        }))
    });
    // Maneja el envío del formulario
    const handleSubmit = (e) => {
        e.preventDefault();
        addProducto({
            nombre,
            descripcion,
            precio: parseFloat(precio),
            categoria: categoria[0] || "", 
            imagen
        });
        // Limpia los campos
        setNombre('');
        setDescripcion('');
        setPrecio('');
        setCategoria([]);
        setImagen('');

        navigate('/'); // Redirige a la página principal
    };
    // Maneja la adición de una nueva categoría
    const handleAddCategoria = () => {
        if (nuevaCategoria.trim() !== '') {
            addCategoria(nuevaCategoria.trim());
            setCategoria([nuevaCategoria.trim()]);
            setNuevaCategoria('');
            setShowAddCategoria(false);
        }
    };

    return (
        <Stack as="form" onSubmit={handleSubmit}>
            <Field.Root required>
                <Field.Label>
                    Nombre: <Field.RequiredIndicator />
                </Field.Label>
                <Input placeholder='Nombre del Producto' value={nombre} onChange={e => setNombre(e.target.value)} />
                <Field.ErrorText>This field is required</Field.ErrorText>
            </Field.Root>

            <Field.Root required>
                <Field.Label>
                    Descripcion: <Field.RequiredIndicator />
                </Field.Label>
                <Textarea placeholder='Descripcion del Producto' minH={10} h={10} value={descripcion} onChange={e=> setDescripcion(e.target.value)} />
            </Field.Root>
            <Field.Root required>
                <Field.Label>
                    Precio: <Field.RequiredIndicator />
                </Field.Label>
                <InputGroup startElement="$">
                    <Input placeholder='0.00' type='number' step={0.01} min={0} value={precio} onChange={e => setPrecio(e.target.value)}/>
                </InputGroup>
            </Field.Root>
            <Field.Root required>
                <Field.Label>
                    Categoria: <Field.RequiredIndicator />
                </Field.Label>
                <Box display="flex" alignItems="center" gap={2} w="100%">
                    <Select.Root
                        collection={categoriasCollection}
                        // size="sm"
                        // width="320px"
                        value={categoria}
                        onValueChange={(e) => setCategoria(e.value)}
                    >
                        <Select.HiddenSelect />

                        <Select.Control>
                            <Select.Trigger>
                                <Select.ValueText placeholder="Selecciona una categoría" />
                            </Select.Trigger>
                            <Select.IndicatorGroup>
                                <Select.Indicator />
                            </Select.IndicatorGroup>
                        </Select.Control>
                        <Portal>
                            <Select.Positioner>
                                <Select.Content>
                                    {categoriasCollection.items.map((cat) => (
                                        <Select.Item item={cat} key={cat.value}>
                                            {cat.label}
                                            <Select.ItemIndicator />
                                        </Select.Item>
                                    ))}
                                </Select.Content>
                            </Select.Positioner>
                        </Portal>
                    </Select.Root>
                    <IconButton
                        aria-label="Agregar categoría"
                        size="sm"
                        onClick={() => setShowAddCategoria(!showAddCategoria)}
                        variant="outline">
                        ➕
                    </IconButton>
                </Box>
                {showAddCategoria && (
                    <Box mt={2} display="flex" gap={2}>
                        <Input
                            size="sm"
                            placeholder="Nueva categoría"
                            value={nuevaCategoria}
                            onChange={e => setNuevaCategoria(e.target.value)}
                        />
                        <Button size="sm" onClick={handleAddCategoria}>Agregar</Button>
                        <Button size="sm" onClick={() => setShowAddCategoria(!showAddCategoria)} variant="outline">Cancelar</Button>
                    </Box>
                )}
            </Field.Root>
            <Field.Root required>
                <Field.Label>
                    Imagen: <Field.RequiredIndicator />
                </Field.Label>
                <Input placeholder='https://...' value={imagen} onChange={e => setImagen(e.target.value)} />
                <Field.HelperText>Ingrese el url de la imagen.</Field.HelperText>
            </Field.Root>
            {/* Prueba de imagen */}
            {/* <Field.Root>
                    <Field.Label>
                        Imagen:
                        <Field.RequiredIndicator />
                    </Field.Label>
                    <Tabs.Root defaultValue="link" onChange={idx => setImageType(idx === 0 ? 'link' : 'file')}>
                        <Tabs.List>
                            <Tabs.Trigger value="link">Link</Tabs.Trigger>
                            <Tabs.Trigger value="file"> Subir archivo</Tabs.Trigger>
                        </Tabs.List>

                        <Tabs.Content value="link">
                            <Input
                                placeholder='URL de la imagen'
                                value={imageLink}
                                onChange={e => setImageLink(e.target.value)}
                            />
                        </Tabs.Content>
                        <Tabs.Content value="file">
                            <Input
                                type="file"
                                accept="image/*"
                                onChange={e => setImageFile(e.target.files[0])}
                            />
                        </Tabs.Content>

                    </Tabs.Root>
                </Field.Root> */}
            <Button as="button" type="submit">Crear Producto</Button>
        </Stack>
    )
}

export default ProductsForm;