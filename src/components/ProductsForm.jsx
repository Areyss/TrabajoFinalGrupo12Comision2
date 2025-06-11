import {
    Button, Box, Field, Fieldset, Input, InputGroup, Stack, Textarea, Portal, Select, createListCollection, Heading
} from '@chakra-ui/react';
import { useState, useMemo } from 'react';
import { useProductos } from '../hooks/useProductos';
import { useNavigate } from 'react-router-dom';
import AgregarCategoriaPopover from "./AgregarCategoriaPopover";

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

    // Estado para manejar errores del formulario
    const [formError, setFormError] = useState('');
    const [submitted, setSubmitted] = useState(false);

    // Adaptar categorías al formato que espera createListCollection
    const categoriasCollection = useMemo(() =>
        createListCollection({
            items: categorias.map(cat => ({
                label: cat.nombre,
                value: String(cat.nombre)
            }))
        }),
        [categorias]
    );

    // Validaciones
    function esUrlImagenValida(url) {
        return /^https?:\/\/.+\.(jpg|jpeg|png|webp|gif)$/i.test(url.trim());
    }
    function esPrecioValido(numero) {
        return !isNaN(numero) && parseFloat(numero) >= 0;
    }

    // Maneja el envío del formulario
    const handleSubmit = (e) => {
        e.preventDefault();
        // Validaciones simples
        setSubmitted(true);
        if (!nombre || !descripcion || !esPrecioValido(precio) || !categoria[0] || !esUrlImagenValida(imagen)) {
            setFormError("Complete todos los campos.");
            return;
        }
        setFormError("");
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

    return (
        <Stack as="form" onSubmit={handleSubmit} noValidate>
            <Fieldset.Root size="lg" invalid={!!formError} >
                <Fieldset.Legend><Heading size="3xl">Agregar Producto</Heading></Fieldset.Legend>
                <Fieldset.Content>
                    <Field.Root required invalid={submitted && !nombre}>
                        <Field.Label>
                            Nombre: <Field.RequiredIndicator />
                        </Field.Label>
                        <Input placeholder='Nombre del Producto' value={nombre} onChange={e => setNombre(e.target.value)} />
                        <Field.ErrorText>El nombre es obligatorio.</Field.ErrorText>
                    </Field.Root>

                    <Field.Root required invalid={submitted && !descripcion}>
                        <Field.Label>
                            Descripcion: <Field.RequiredIndicator />
                        </Field.Label>
                        <Textarea placeholder='Descripcion del Producto' minH={10} h={10} value={descripcion} onChange={e => setDescripcion(e.target.value)} />
                        <Field.ErrorText>La descripción es obligatoria.</Field.ErrorText>
                    </Field.Root>

                    <Field.Root required invalid={submitted && !esPrecioValido(precio)}>
                        <Field.Label>
                            Precio: <Field.RequiredIndicator />
                        </Field.Label>
                        <InputGroup startElement="$">
                            <Input placeholder='0,00' type='number' step={0.01} min={0} value={precio} onChange={e => setPrecio(e.target.value)} />
                        </InputGroup>
                        <Field.ErrorText>El precio es obligatorio y debe ser mayor a 0.</Field.ErrorText>
                    </Field.Root>

                    <Field.Root required invalid={submitted && !categoria[0]}>
                        <Field.Label>
                            Categoria: <Field.RequiredIndicator />
                        </Field.Label>
                        <Box display="flex" alignItems="center" gap={2} w="100%">
                            <Select.Root
                                collection={categoriasCollection}
                                value={categoria}
                                onValueChange={(e) => setCategoria(e.value)}
                            >
                                <Select.HiddenSelect />

                                <Select.Control>
                                    <Select.Trigger>
                                        <Select.ValueText placeholder="Selecciona una categoría" />
                                    </Select.Trigger>
                                    <Select.IndicatorGroup>
                                        <Select.ClearTrigger />
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

                            <AgregarCategoriaPopover onAdd={nombre => {
                                addCategoria(nombre);
                                setCategoria([nombre]);
                            }} />
                        </Box>
                        <Field.ErrorText>La categoría es obligatoria.</Field.ErrorText>                        
                    </Field.Root>

                    <Field.Root required invalid={submitted && !esUrlImagenValida(imagen)}>
                        <Field.Label>
                            Imagen: <Field.RequiredIndicator />
                        </Field.Label>
                        <Input placeholder='https://...' value={imagen} onChange={e => setImagen(e.target.value)} />
                        <Field.HelperText>Ingrese el url de la imagen.</Field.HelperText>
                        <Field.ErrorText>La imagen debe ser una URL válida que termine en .jpg, .jpeg, .png, .webp o .gif</Field.ErrorText>
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
                </Fieldset.Content>
                {formError && (
                    <Fieldset.ErrorText>
                        {formError}
                    </Fieldset.ErrorText>
                )}
            </Fieldset.Root>
            <Button as="button" type="submit" mt="5">Crear Producto</Button>
        </Stack>
    )
}

export default ProductsForm;