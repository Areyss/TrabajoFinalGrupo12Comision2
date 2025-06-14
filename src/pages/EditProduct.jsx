import { Box} from '@chakra-ui/react';
import { useParams, useNavigate } from "react-router-dom";
import { useProductos } from "../hooks/useProductos";
import ProductsForm from "../components/ProductsForm";
import { useAppColors } from '../theme/colors';

const EditProduct = () => {
    const { id } = useParams();
    const { productos } = useProductos();
    const productoEditar = productos.find(p => p.id === parseInt(id));
    const colors = useAppColors();


    if (!productoEditar) {
        return (
            <Center minH="60vh">
                <Text fontSize="xl" color="gray.400">
                    Producto no encontrado.
                </Text>
            </Center>
        );
    }

    return (
        <Box p={6} maxW="80%" mx="auto" border="1px solid" borderRadius="lg" borderColor={colors.secondary} boxShadow="lg" bg={colors.bgPrimary} padding="20">
            <ProductsForm
                productoEditar={productoEditar}
            />
        </Box>
        
    );
};

export default EditProduct;