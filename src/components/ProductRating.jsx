import { HStack, Box } from "@chakra-ui/react";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

const RatingStars = ({rate}) => {
    const stars = [];

    for (let i = 1; i <= 5; i++) {
        if (rate >= i) {
            // Estrella llena
            stars.push(<FaStar key={i} color="#FFD700" />);
        } else if (rate >= i - 0.5) {
            // Estrella a la mitad
            stars.push(<FaStarHalfAlt key={i} color="#FFD700" />);
        } else {
            // Estrella sin llenar
            stars.push(<FaRegStar key={i} color="#FFD700" />);
        }
    }
    return (<HStack spacing={1}>{stars}</HStack>);
}

export default RatingStars;