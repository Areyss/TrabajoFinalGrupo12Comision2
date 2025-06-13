import { Box,  Center,  Heading } from '@chakra-ui/react';
import { useAppColors } from '../theme/colors';
import { useState } from 'react';
import ProductsForm from '../components/ProductsForm';
const CreateProduct = () => {
    const colors = useAppColors();
    
    return (
        <Box p={6} maxW="80%" mx="auto" border="1px solid" borderRadius="lg" borderColor={colors.secondary} boxShadow="lg" bg={colors.bgPrimary} padding="20">
            <ProductsForm />
        </Box>
    );
}
export default CreateProduct;