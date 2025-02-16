// src/theme.ts
import { extendTheme } from "@chakra-ui/react";

// Definição do tema personalizado
const theme = extendTheme({
  colors: {
    red: "#E52E4D",
    green: "#4CAF50",
    blue: "#2973B2",
    lightBlue: "#3B87C8",
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
  components: {
    Input: {
      variants: {
        outline: {
          field: {
            border: "1px solid",
            borderColor: "gray.300",
            backgroundColor: "#E7E9EE",
            _focus: {
            border: "2px solid",
              borderColor: "#2973B2",
              backgroundColor: "white",
              boxShadow: 'none',
            },
          },
        },
      },
    },
  },
});

export default theme;
