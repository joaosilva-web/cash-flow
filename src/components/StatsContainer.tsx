import { Container, HStack } from "@chakra-ui/react";
import { MoneyStat } from "./MoneyStat";


export function StatsContainer() {
  return (
    <Container maxW="1120px" marginTop="-4.25rem" p="0">
      <HStack justifyContent="space-between" p="0">
        {/* Inflow cash */}
        <MoneyStat type="In Flow" valueToCount={13457.56}/>

        {/* Outflow cash */}
        <MoneyStat type="Out Flow" valueToCount={1234.78}/>

        {/* total cash */}
        <MoneyStat type="Total" valueToCount={13457.56 - 1234.78}/>
      </HStack>
    </Container>
  );
}
