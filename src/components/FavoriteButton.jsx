import { IconButton, Icon } from "@chakra-ui/react";
import { HiHeart } from "react-icons/hi";
import { LuHeart } from "react-icons/lu";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useAppColors } from "../theme/colors";

const FavoriteButton = ({ isFavorite, onToggle }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const colors = useAppColors();

  const handleClick = (e) => {
    e.stopPropagation();
    e.preventDefault();
    if (!user) {
      navigate("/login");
      return;
    }
    onToggle();
  };

  return (
    <IconButton
      aria-label="Favorite"
      rounded="full"
      position="absolute"
      top={2}
      right={2}
      color={colors.gray}
      opacity={0.9}
      variant="ghost"
      size="lg"
      onClick={handleClick}
    >
      {isFavorite ? <Icon as={HiHeart} size="lg" color="pink.700"/> : <LuHeart />}
    </IconButton>
  );
};

export default FavoriteButton;