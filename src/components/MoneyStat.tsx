import { Box, HStack, Icon, Text } from "@chakra-ui/react";
import {
    ArrowCircleDown,
    ArrowCircleUp,
    CurrencyDollar,
  } from "@phosphor-icons/react";
import { motion } from "motion/react";
import { MoneyCounter } from "./MoneyCounter";

interface IMoneyStatProps {
    valueToCount: number;
    type: 'In Flow' | 'Out Flow' | 'Total'
  
}

// objetos para mapear de acordo com o tipo recebido
const colorTextMap = {
    'In Flow': 'title',
    'Out Flow':'title',
    'Total': 'white'
}

const colorIconMap = {
    'In Flow': 'green',
    'Out Flow':'red',
    'Total': 'white'
}

const iconMap = {
    'In Flow': ArrowCircleUp,
    'Out Flow': ArrowCircleDown,
    'Total': CurrencyDollar,
}

const delayMap = {
    'In Flow': 0,
    'Out Flow': 0.25,
    'Total': 0.5,
};

const MotionBox = motion(Box);

export function MoneyStat({valueToCount, type}: IMoneyStatProps) {
  return (
    <MotionBox
      w="352px"
      h="150px"
      bg={type === 'Total'? 'green' : 'white'}
      borderRadius="8px"
      p="2rem"
      display="flex"
      justifyContent="space-between"
      initial={{ y: 50, display: 'none' }}
      animate={{ y: 0, display: 'block' }}
      transition={{
        type: "spring", // Animação tipo mola (efeito bounce)
        stiffness: 200, // Define a força do efeito
        damping: 9, // Controla a oscilação
        delay: delayMap[type] // Define o Delay de acordo com o tipo
      }}
    >
      <Box w="100%">
        <HStack justifyContent="space-between" w="100%">
          <Text color={colorTextMap[type]}>{type}</Text>
          <Icon as={iconMap[type]} w="2rem" h="2rem" color={colorIconMap[type]} />
        </HStack>
        <MoneyCounter color={colorTextMap[type]} valueToCount={valueToCount} />
      </Box>
    </MotionBox>
  );
}
