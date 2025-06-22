import { Box } from '@chakra-ui/react';
import { useAppColors } from '../theme/colors';
import ProductsForm from '../components/ProductsForm';
const CreateProduct = () => {
    const colors = useAppColors();
    
    return (
        <Box p={20} py={10} maxW="60%" mx="auto" mt={10} border="1px solid" borderRadius="lg" borderColor={colors.secondary} boxShadow="lg" bg={colors.bgPrimary}>
            <ProductsForm />
        </Box>
    );
}
export default CreateProduct;