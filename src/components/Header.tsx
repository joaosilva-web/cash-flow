import { Box, Button, Container, Text, useDisclosure } from "@chakra-ui/react";
import { ModalNewTransaction } from "./ModalNewTransaction";
import { motion } from "motion/react";

const MotionButton = motion(Button);
const MotionText = motion(Text);

export function Header() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box bg={"blue"} as={"header"} w={"100%"} h={"212"}>
      <Container
        display="flex"
        justifyContent="space-between"
        maxW="1120px"
        padding="2rem 0"
      >
        <Box display="flex" alignItems="center" color="white" gap="18px">
        <motion.svg
          initial={{ pathLength: 0, x: -100 }}
          animate={{ pathLength: 1, x: 0 }}
          transition={{
            type: "spring",
            bounce: 0.2,
            stiffness: 150,
            damping: 15,
            opacity: { duration: 0.5 },
          }}
          width="34"
          height="50"
          viewBox="0 0 34 50"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <motion.path
            initial={{ pathLength: 0, stroke: "#FAFAFA"}}
            animate={{ pathLength: 1, stroke: "#4CAF50"}}
            transition={{
              pathLength: { duration: 2.5, bounce: 0 },
                opacity: { duration: 0.01 },
                duration: 1
            }}
            d="M33 15.6667V15.2778C33 10.3379 28.9955 6.33333 24.0555 6.33333H10.3333C5.17867 6.33333 1 10.512 1 15.6667C1 20.8213 5.17867 25 10.3333 25H23.6667C28.8213 25 33 29.1787 33 34.3333C33 39.488 28.8213 43.6667 23.6667 43.6667H10.1389C5.09163 43.6667 1 39.5749 1 34.5277V34.3333M17 1V49"
            stroke="white"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </motion.svg>
        <MotionText
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0, transition: {type:"spring", duration: 0.25, delay: 0.2, bounce: 0.1, stiffness: 150} }}
        fontSize="2rem" fontWeight="thin">Cash Flow
        </MotionText>
        </Box>

        <MotionButton
          bg="lightBlue"
          color="white"
          h="48px"
          _hover={{ backgroundColor: "lightBlue" }}
          onClick={onOpen}
          whileHover={{
            scale: 1.1, // Cresce, encolhe e volta ao tamanho original
            transition: {
              type: "spring",
              visualDuration: 0.05,
              bounce: 0.05,
              damping: 4,
            },
          }}
          whileTap={{
            scale: 0.95, // Cresce, encolhe e volta ao tamanho original
            transition: {
              type: "spring",
              visualDuration: 0.05,
              bounce: 0.05,
              damping: 4,
            },
          }}
        >
          New Transaction
        </MotionButton>
      </Container>
      <ModalNewTransaction isModalOpen={isOpen} onModalClose={onClose} />
    </Box>
  );
}
