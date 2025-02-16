// src/App.tsx
import { Container } from "@chakra-ui/react";
import { Header } from "./components/Header";
import { StatsContainer } from "./components/StatsContainer";
import { TransactionsContainer } from "./components/TransactionsContainer";

function App() {

  return (
    <Container maxW="100%" p="0" bg="background" minH="100vh">
      <Header/>
      <StatsContainer/>
      <TransactionsContainer/>
    </Container>
  );
}

export default App;
