// src/theme.ts
import { extendTheme } from "@chakra-ui/react";

// Definição do tema personalizado
const theme = extendTheme({
  colors: {
    red: "#E52E4D",
    green: "#4CAF50",
    blue: "#2973B2",
    white: "#FAFAFA",
    title: "#363F5F",
    text: "#969CB2",
    background: "#F0F2F5",
  },
  semanticTokens: {
    colors: {
      danger: { value: "red" },
      primary: { value: "blue" },
    },
  },
});

export default theme;
