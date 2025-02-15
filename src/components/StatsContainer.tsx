import { Box, Container, Heading, HStack, Icon, Text } from "@chakra-ui/react";
import { ArrowCircleDown, ArrowCircleUp, CurrencyDollar } from "@phosphor-icons/react";

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
            <Icon as={ArrowCircleUp} w="2rem" h="2rem" color="green"/>
            </HStack>
            <Text fontSize="2.25rem" color="title">R$ 1.000,00</Text>
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
            <Icon as={ArrowCircleDown} w="2rem" h="2rem" color="red"/>
            </HStack>
            <Text fontSize="2.25rem" color="title">R$ 1.000,00</Text>
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
            <Icon as={CurrencyDollar} w="2rem" h="2rem" color="white"/>
            </HStack>
            <Text fontSize="2.25rem" color="white">R$ 1.000,00</Text>
          </Box>
        </Box>
      </HStack>
    </Container>
  );
}
