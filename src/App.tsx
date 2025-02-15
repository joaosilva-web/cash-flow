// src/App.tsx
import { Container } from "@chakra-ui/react";
import { Header } from "./components/Header";
import { StatsContainer } from "./components/StatsContainer";

function App() {
  return (
    <Container maxW="100%" p="0" bg="background" minH="100vh">
      <Header/>
      <StatsContainer/>
    </Container>
  );
}

export default App;
