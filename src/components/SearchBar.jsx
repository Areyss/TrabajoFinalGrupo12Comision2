import { useProductos } from "../hooks/useProductos";
import { Input, Button, Group } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useAppColors } from "../theme/colors";
import { useLocation, useNavigate } from "react-router-dom";

const SearchBar = () => {
  const { productos, setSearchResults } = useProductos();
  const [search, setSearch] = useState("");
  const colors = useAppColors();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if(location.pathname!="/productos") setSearch("");
  }, [location.pathname]);
  
  const handleSearch = () => {
    const consulta = search.trim().toLowerCase();
    if (!consulta) {
      setSearchResults(null);
      return;
    }
    const filtrados = productos.filter(product =>
      product.title.toLowerCase().includes(consulta) ||
      product.category.toLowerCase().includes(consulta)
    );
    setSearchResults(filtrados);
    navigate("/productos");
  };

  return (
    <Group attached w="full" maxW="2xl" position={"absolute"} top="50%" right="0%" transform={"translate(-50%,-50%)"}>
      <Input
        placeholder="Buscar productos por Nombre o Categoría"
        value={search}
        onChange={e => setSearch(e.target.value)}
        onKeyDown={e => { if (e.key === "Enter") handleSearch(); }}
        bg="white"
        border="0px"
        color={"black"}
        css={{"--focus-color":`${colors.accent}`}}
      />
      <Button bg={colors.accent} color={"black"} onClick={handleSearch} border="0px" _hover={{bg: colors.hoverAccent}}>
        Buscar
      </Button>
    </Group>
  );
};

export default SearchBar;