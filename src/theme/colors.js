import { useColorModeValue } from "../components/ui/color-mode";

export function useAppColors() {
  return {
    // Color principal de la marca (botones principales, links destacados)
    primary: useColorModeValue('#009688', '#B71C1C'),

    // Hover para el color principal
    primaryHover: useColorModeValue('#81a160', '#52043d'), 

    // Fondo de tarjetas, contenedores secundarios, etc.
    secondary: useColorModeValue('#E9ECEF', '#1A1A1A'),

    // Color de acento (detalles, hover de links, badges, iconos destacados)
    accent: useColorModeValue('#FFD600', '#FFB300'),

    // Texto principal sobre fondos destacados (ej: botones primary)
    textPrimary: useColorModeValue('white', '#E9ECEF'),

    // Texto secundario (subtítulos, descripciones, textos menos importantes)
    textSecondary: useColorModeValue('#ADB5BD', '#ADB5BD'),

    // Color general para textos en fondos neutros
    textColor: useColorModeValue("gray.700", "gray.200"),

    // Color para acciones destructivas (borrar, advertencias críticas)
    danger: useColorModeValue('#c95965', '#C43F4E'),

    // Hover para botones de peligro
    dangerHover: useColorModeValue('#A13340', '#C43F4E'),

    // Advertencias o mensajes de precaución
    warning: useColorModeValue('#f1d35b', '#cdb11c'),

    // Hover para advertencias
    warningHover: useColorModeValue('#c8a43f', '#af9611'),

    // Mensajes de éxito, confirmaciones
    success: useColorModeValue('green.500', 'green.400'),

    // Mensajes informativos, links secundarios
    info: useColorModeValue('blue.500', 'blue.300'),

    // Bordes, iconos, textos deshabilitados
    gray: useColorModeValue('gray.500', 'gray.700'),

    // Fondo general de la app
    bg: useColorModeValue('gray.100', 'black.800'),

    // Fondo de áreas principales (cards, formularios, etc.)
    bgPrimary: useColorModeValue('gray.50', 'gray.950'),

    // Fondo del footer
    footerBg: useColorModeValue('#E9ECEF', '#1A1A1A')
  };
}
