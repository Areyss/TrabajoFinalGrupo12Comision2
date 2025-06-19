import {
  Stack,
  HStack,
  Skeleton,
  SkeletonCircle,
  SkeletonText,
} from "@chakra-ui/react";

const ProductSkeleton = () => {
    return (
        <Stack gap="6" maxW="xl " w="100%" borderWidth="1px" borderRadius="md" p={4} boxShadow="md">            
            <Skeleton height="220px" borderRadius="md" />
            <SkeletonText noOfLines={2} mt={2} />
            <Skeleton height="40px" borderRadius="md" mt={2} />
        </Stack>
    );
}
export default ProductSkeleton;