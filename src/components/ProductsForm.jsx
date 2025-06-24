import { Button, Box, Field, Fieldset, Input, InputGroup, Stack, Textarea, Portal, Select, createListCollection, Heading } from '@chakra-ui/react';
import { useState, useMemo, useEffect } from 'react';
import { useProductos } from '../hooks/useProductos';
import { useNavigate } from 'react-router-dom';
import AgregarCategoriaPopover from "./AgregarCategoriaPopover";
import { useAppColors } from '../theme/colors';
import { validarProducto } from "../services/useValidacionesProducto";

const ProductsForm = ({ productoEditar = null}) => {
    // Importa el hook useProductos para acceder a las funciones y estados del contexto
    const { addProducto, categorias, addCategoria, updateProducto } = useProductos();
    const navigate = useNavigate();
    const colors = useAppColors();

    // Si hay productoEditar, inicializa los estados con sus valores
    const [form, setForm] = useState({
        title: productoEditar?.title || "",
        description: productoEditar?.description || "",
        price: productoEditar?.price ? String(productoEditar.price) : "",
        category: productoEditar?.category ? [productoEditar.category] : [],
        image: productoEditar?.image || ""
    });
  
    const { errores, hayErrores } = useMemo(() => validarProducto(form), [form]);
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
        if (submitted && !hayErrores) {
            setFormError("");
        }
    }, [errores, hayErrores, submitted]);

    //handle para actualizar los estados del objeto form
    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({...prev, [name]: value }));
    };
    const handleValueChange = (e) => {
        const newValue = Array.isArray(e.value) ? e.value : [e.value]
        setForm(prev => ({ ...prev, category: newValue }))
    }

    // Maneja el envío del formulario
    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);

        if (hayErrores) {
            setFormError("Complete todos los campos correctamente.");
            return;
        }

        setIsSubmitting(true);

        //Se crea el objetoProducto
        const producto = {
            ...productoEditar, // Mantiene id y otros campos si es edición
            title: form.title,
            description: form.description,
            price: parseFloat(form.price),
            category: form.category[0] || "",
            image: form.image
        };
        
        //decide segun si es alta o actualizacion para ejecutar las funciones
        productoEditar ? updateProducto(producto): addProducto(producto);

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
                    <Field.Root required invalid={submitted && !!errores.title}>
                        <Field.Label>
                            Nombre: <Field.RequiredIndicator />
                        </Field.Label>
                        <Input name="title" placeholder='Nombre del Producto' value={form.title} onChange={handleChange} />
                        <Field.ErrorText>{errores.title}</Field.ErrorText>
                    </Field.Root>

                    <Field.Root required invalid={submitted && !!errores.description}>
                        <Field.Label>
                            Descripción: <Field.RequiredIndicator />
                        </Field.Label>
                        <Textarea name="description" placeholder='Descripción del Producto' minH={10} autoresize value={form.description} onChange={handleChange} />
                        <Field.ErrorText>{errores.description}</Field.ErrorText>
                    </Field.Root>

                    <Box display="flex" gap={4}>
                        <Field.Root required invalid={submitted && !!errores.price}>
                            <Field.Label>
                                Precio: <Field.RequiredIndicator />
                            </Field.Label>
                            <InputGroup startElement="$">
                                <Input name="price" placeholder='0,00' type='number' step={0.01} min={0} value={form.price} onChange={handleChange} />
                            </InputGroup>
                            <Field.ErrorText>{errores.price}</Field.ErrorText>
                        </Field.Root>

                        <Field.Root required invalid={submitted && !!errores.category}>
                            <Field.Label>
                                Categoría: <Field.RequiredIndicator />
                            </Field.Label>
                            <Box display="flex" alignItems="center" gap={2} w="100%">
                                <Select.Root
                                    collection={categoriasCollection}
                                    value={form.category}
                                    onValueChange={handleValueChange}
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
                                    setForm(prev => ({ ...prev, category: [nombre] }));
                                }} />
                            </Box>
                            <Field.ErrorText>{errores.category}</Field.ErrorText>
                        </Field.Root>

                    </Box>
                    <Field.Root required invalid={submitted && !!errores.image}>
                        <Field.Label>
                            Imagen: <Field.RequiredIndicator />
                        </Field.Label>
                        <Input name="image" placeholder='https://...' value={form.image} onChange={handleChange} />
                        <Field.HelperText>Ingrese el url de la imagen.</Field.HelperText>
                        <Field.ErrorText>{errores.image}</Field.ErrorText>
                        {form.image && !errores.image && (
                            <Box mt={3} display="flex" justifyContent="center">
                                <img
                                    src={form.image}
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