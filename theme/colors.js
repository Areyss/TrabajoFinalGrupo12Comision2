import { useColorModeValue } from "../src/components/ui/color-mode";

export function useAppColors() {
  return {
    primary: useColorModeValue('#A0C878', '#720455'),
    primaryHover: useColorModeValue('#81a160', '#52043d'),
    secondary: useColorModeValue('#E9ECEF', '#1A1A1A'),
    accent: useColorModeValue('#DDEB9D', '#125582'),
    textPrimary: useColorModeValue('white', '#E9ECEF'),
    textSecondary: useColorModeValue('#ADB5BD', '#ADB5BD'),
    textColor: useColorModeValue("gray.700", "gray.200"),
    danger: useColorModeValue('#c95965', '#C43F4E'),
    dangerHover: useColorModeValue('#A13340', '#C43F4E'),
    warning: useColorModeValue('#f1d35b', '#cdb11c'),
    warningHover: useColorModeValue('#c8a43f', '#af9611'),
    success: useColorModeValue('green.500', 'green.400'),
    info: useColorModeValue('blue.500', 'blue.300'),
    gray: useColorModeValue('gray.500', 'gray.700'),
    bg: useColorModeValue('gray.100', 'black.800'),
    bgPrimary: useColorModeValue('gray.50', 'gray.950'),
    footerBg: useColorModeValue('#E9ECEF', '#1A1A1A')
  };
}
