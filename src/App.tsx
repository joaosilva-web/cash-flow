// src/App.tsx
import { Box, Button, VStack, Text } from "@chakra-ui/react";

function App() {
  return (
    <VStack spacing={4} p={8}>
      <Text fontSize="2xl" color="title">
        Testando Chakra UI v3.8.0
      </Text>
      <Box w="200px" h="100px" bg="blue" />
      <Button bg="red" color="white">
        Clique aqui
      </Button>
    </VStack>
  );
}

export default App;
