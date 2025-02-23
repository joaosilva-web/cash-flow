// src/App.tsx
import { Container } from "@chakra-ui/react";
import { Header } from "./components/Header";
import { StatsContainer } from "./components/StatsContainer";
import { TransactionsContainer } from "./components/TransactionsContainer";
import { TransactionsProvider } from "./hooks/useTransactions";

function App() {
  return (
    <TransactionsProvider>
      <Container maxW="100vw" p="0" bg="background" minH="100vh">
        <Header />
        <StatsContainer />
        <TransactionsContainer />
      </Container>
    </TransactionsProvider>
  );
}

export default App;
