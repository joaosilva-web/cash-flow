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
  type: "In Flow" | "Out Flow" | "Total";
}

const colorTextMap = {
  "In Flow": "title",
  "Out Flow": "title",
  Total: "white",
};

const colorIconMap = {
  "In Flow": "green",
  "Out Flow": "red",
  Total: "white",
};

const iconMap = {
  "In Flow": ArrowCircleUp,
  "Out Flow": ArrowCircleDown,
  Total: CurrencyDollar,
};

const delayMap = {
  "In Flow": 0,
  "Out Flow": 0.25,
  Total: 0.5,
};

const MotionBox = motion(Box);

export function MoneyStat({ valueToCount, type }: IMoneyStatProps) {
  return (
    <MotionBox
      w={{ base: "100%", sm: "250px", md: "100%", lg: "325px" }}
      h={{ base: "auto", md: "150px" }}
      bg={type === "Total" ? "green" : "white"}
      borderRadius="8px"
      p={{ base: "1rem", md: "2rem" }}
      display="flex"
      justifyContent="space-between"
      flexDir="column"
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{
        type: "spring",
        stiffness: 200,
        damping: 9,
        delay: delayMap[type],
      }}
    >
      <Box w="100%">
        <HStack justifyContent="space-between" w="100%">
          <Text color={colorTextMap[type]} fontSize={{ base: "md", md: "lg" }}>
            {type}
          </Text>
          <Icon
            as={iconMap[type]}
            w={{ base: "1.5rem", md: "2rem" }}
            h={{ base: "1.5rem", md: "2rem" }}
            color={colorIconMap[type]}
          />
        </HStack>
        <MoneyCounter
          color={colorTextMap[type]}
          valueToCount={valueToCount}
        />
      </Box>
    </MotionBox>
  );
}
