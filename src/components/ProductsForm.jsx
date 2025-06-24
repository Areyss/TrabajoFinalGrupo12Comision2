import { Button, Box, Field, Fieldset, Input, InputGroup, Stack, Textarea, Portal, Select, createListCollection, Heading } from '@chakra-ui/react';
import { useState, useMemo, useEffect } from 'react';
import { useProductos } from '../hooks/useProductos';
import { useNavigate } from 'react-router-dom';
import AgregarCategoriaPopover from "./AgregarCategoriaPopover";
import { useAppColors } from '../theme/colors';

const ProductsForm = ({ productoEditar = null}) => {
    // Importa el hook useProductos para acceder a las funciones y estados del contexto
    const { addProducto, categorias, addCategoria, updateProducto } = useProductos();
    const navigate = useNavigate();
    const colors = useAppColors();


    // Si hay productoEditar, inicializa los estados con sus valores
    const [title, setTitle] = useState(productoEditar?.title || "");
    const [description, setDescription] = useState(productoEditar?.description || "");
    const [price, setPrice] = useState(productoEditar?.price ? String(productoEditar.price) : "");
    const [category, setCategory] = useState(productoEditar?.category ? [productoEditar.category] : []);
    const [image, setImage] = useState(productoEditar?.image || "");

    // Estado para manejar errores del formulario
    const [formError, setFormError] = useState('');
    const [submitted, setSubmitted] = useState(false); //Para mostrar los errores de validacion
    const [isSubmitting, setIsSubmitting] = useState(false); //Para el spinner de carga

    // Adaptar categorías al formato que espera createListCollection
    const categoriasCollection = useMemo(() =>
        createListCollection({
            items: categorias.map(cat => ({
                label: cat,
                value: String(cat)
            }))
        }),
        [categorias]
    );
    // Limpia el error general si todos los campos son válidos
useEffect(() => {
    if (
        title &&
        description &&
        esPrecioValido(price) &&
        category[0] &&
        esUrlImagenValida(image)
    ) {
        setFormError('');
    }
}, [title, description, price, category, image]);
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
        if (!title || !description || !esPrecioValido(price) || !category[0] || !esUrlImagenValida(image)) {
            setFormError("Complete todos los campos.");
            return;
        }
        setFormError("");
        setIsSubmitting(true);
        const producto = {
            ...productoEditar, // Mantiene id y otros campos si es edición
            title,
            description,
            price: parseFloat(price),
            category: category[0] || "",
            image
        };
        if (productoEditar) {
            updateProducto(producto);
        } else {
            // Si es alta, agrega el producto
            addProducto(producto);
        }

        setTimeout(() => {
            setIsSubmitting(false);
            if (productoEditar) {
                // Si es edición, redirige al detalle del producto editado
                navigate(`/productos/${producto.id}`);
            } else {
                // Si es alta, redirige a la lista de productos
                navigate('/'); // Redirige a la página principal
            }
        }, 600); // Pequeño delay para UX
    };

    return (
        <Stack as="form" onSubmit={handleSubmit} noValidate>
            <Fieldset.Root size="lg" invalid={!!formError} >
                <Fieldset.Legend>
                    <Heading size="3xl">{productoEditar ? "Editar Producto" : "Agregar Producto"}</Heading>
                </Fieldset.Legend>
                <Fieldset.Content>
                    <Field.Root required invalid={submitted && !title}>
                        <Field.Label>
                            Nombre: <Field.RequiredIndicator />
                        </Field.Label>
                        <Input placeholder='Nombre del Producto' value={title} onChange={e => setTitle(e.target.value)} />
                        <Field.ErrorText>El nombre es obligatorio.</Field.ErrorText>
                    </Field.Root>

                    <Field.Root required invalid={submitted && !description}>
                        <Field.Label>
                            Descripción: <Field.RequiredIndicator />
                        </Field.Label>
                        <Textarea placeholder='Descripción del Producto' minH={10} autoresize value={description} onChange={e => setDescription(e.target.value)} />
                        <Field.ErrorText>La descripción es obligatoria.</Field.ErrorText>
                    </Field.Root>
                    <Box display="flex" gap={4}>
                        <Field.Root required invalid={submitted && !esPrecioValido(price)}>
                            <Field.Label>
                                Precio: <Field.RequiredIndicator />
                            </Field.Label>
                            <InputGroup startElement="$">
                                <Input placeholder='0,00' type='number' step={0.01} min={0} value={price} onChange={e => setPrice(e.target.value)} />
                            </InputGroup>
                            <Field.ErrorText>El precio es obligatorio y debe ser mayor a 0.</Field.ErrorText>
                        </Field.Root>

                        <Field.Root required invalid={submitted && !category[0]}>
                            <Field.Label>
                                Categoría: <Field.RequiredIndicator />
                            </Field.Label>
                            <Box display="flex" alignItems="center" gap={2} w="100%">
                                <Select.Root
                                    collection={categoriasCollection}
                                    value={category}
                                    onValueChange={(e) => setCategory(e.value)}
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
                                    setCategory([nombre]);
                                }} />
                            </Box>
                            <Field.ErrorText>La categoría es obligatoria.</Field.ErrorText>
                        </Field.Root>
                    </Box>
                    <Field.Root required invalid={submitted && !esUrlImagenValida(image)}>
                        <Field.Label>
                            Imagen: <Field.RequiredIndicator />
                        </Field.Label>
                        <Input placeholder='https://...' value={image} onChange={e => setImage(e.target.value)} />
                        <Field.HelperText>Ingrese el url de la imagen.</Field.HelperText>
                        <Field.ErrorText>La imagen debe ser una URL válida que termine en .jpg, .jpeg, .png, .webp o .gif</Field.ErrorText>
                        {esUrlImagenValida(image) && (
                            <Box mt={3} display="flex" justifyContent="center">
                                <img
                                    src={image}
                                    alt="Vista previa"
                                    style={{ maxWidth: "150px", maxHeight: "150px", borderRadius: "8px", border: "1px solid #eee" }}
                                />
                            </Box>
                        )}
                    </Field.Root>
                </Fieldset.Content>
                {formError && (
                    <Fieldset.ErrorText>
                        {formError}
                    </Fieldset.ErrorText>
                )}
            </Fieldset.Root>
            <Box display="flex" gap={4} mt={5}>
                <Button as="button" type="submit" bg={ colors.primary } _hover={{bg: colors.primaryHover}} loading={isSubmitting} loadingText={productoEditar ? "Actualizando..." : "Creando..."}>
                    {productoEditar ? "Actualizar Producto" : "Crear Producto"}
                </Button>
                <Button
                    type="button"
                    variant="outline"
                    colorScheme="gray"
                    onClick={() => navigate('/')}
                >
                    Cancelar
                </Button>
            </Box>
        </Stack>
    )
}

export default ProductsForm;