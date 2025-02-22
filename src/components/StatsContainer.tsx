import { Container, HStack } from "@chakra-ui/react";
import { MoneyStat } from "./MoneyStat";
import { useTransactions } from "../hooks/useTransactions";


export function StatsContainer() {
  const {totalAmount, totalInFlow, totalOutFlow} = useTransactions()
  return (
    <Container maxW="1120px" marginTop="-4.25rem" p="0">
      <HStack justifyContent="space-between" p="0">
        {/* Inflow cash */}
        <MoneyStat type="In Flow" valueToCount={totalInFlow}/>

        {/* Outflow cash */}
        <MoneyStat type="Out Flow" valueToCount={totalOutFlow}/>

        {/* total cash */}
        <MoneyStat type="Total" valueToCount={totalAmount}/>
      </HStack>
    </Container>
  );
}
