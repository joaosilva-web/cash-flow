import { Box, Container, HStack, Icon, Text } from "@chakra-ui/react";
import {
  ArrowCircleDown,
  ArrowCircleUp,
  CurrencyDollar,
} from "@phosphor-icons/react";
import { MoneyCounter } from "./MoneyCounter";

export function StatsContainer() {

  return (
    <Container maxW="1120px" marginTop="-4.25rem" p="0">
      <HStack justifyContent="space-between" p="0">
        {/* Inflow cash */}
        <Box
          w="352px"
          h="150px"
          bg="white"
          borderRadius="8px"
          p="2rem"
          display="flex"
          justifyContent="space-between"
        >
          <Box w="100%">
            <HStack justifyContent="space-between" w="100%">
              <Text color="title">Entradas</Text>
              <Icon as={ArrowCircleUp} w="2rem" h="2rem" color="green" />
            </HStack>
              <MoneyCounter valueToCount={123456.20}/>
          </Box>
        </Box>

        {/* Outflow cash */}
        <Box
          w="352px"
          h="150px"
          bg="white"
          borderRadius="8px"
          p="2rem"
          display="flex"
          justifyContent="space-between"
        >
          <Box w="100%">
            <HStack justifyContent="space-between" w="100%">
              <Text color="title">Saídas</Text>
              <Icon as={ArrowCircleDown} w="2rem" h="2rem" color="red" />
            </HStack>
              <MoneyCounter valueToCount={65498.89}/>
          </Box>
        </Box>

        {/* total cash */}
        <Box
          w="352px"
          h="150px"
          bg="green"
          borderRadius="8px"
          p="2rem"
          display="flex"
          justifyContent="space-between"
        >
          <Box w="100%">
            <HStack justifyContent="space-between" w="100%">
              <Text color="white">Total</Text>
              <Icon as={CurrencyDollar} w="2rem" h="2rem" color="white" />
            </HStack>
              <MoneyCounter valueToCount={189434.09} color="white"/>
          </Box>
        </Box>
      </HStack>
    </Container>
  );
}
