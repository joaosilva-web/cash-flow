import { Container, HStack } from "@chakra-ui/react";
import { MoneyStat } from "./MoneyStat";
import { useTransactions } from "../hooks/useTransactions";

export function StatsContainer() {
  const { totalAmount, totalInFlow, totalOutFlow } = useTransactions();

  return (
    <Container 
      maxW={{ base: "90%", md: "80%", lg: "1120px" }} 
      marginTop={{ base: "-3.25rem", md: "-4.25rem" }} 
      p="0"
    >
      <HStack 
        justifyContent="space-between"
        p="0"
        flexWrap="wrap"
        spacing={{ base: 4, md: 4 }}
      >
        {/* Inflow cash */}
        <MoneyStat type="In Flow" valueToCount={totalInFlow} />

        {/* Outflow cash */}
        <MoneyStat type="Out Flow" valueToCount={totalOutFlow} />

        {/* Total cash */}
        <MoneyStat type="Total" valueToCount={totalAmount} />
      </HStack>
    </Container>
  );
}
