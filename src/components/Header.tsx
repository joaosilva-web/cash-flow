import {
  Box,
  Button,
  Container,
  Image,
  useDisclosure,
} from "@chakra-ui/react";
import logo from "../assets/logo.svg";
import { ModalNewTransaction } from "./ModalNewTransaction";

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
        <Image src={logo} />
        <Button
          bg="lightBlue"
          color="white"
          h="48px"
          _hover={{ backgroundColor: "lightBlue", transform: "scale(1.01)" }}
          onClick={onOpen}
        >
          New Transaction
        </Button>
      </Container>
      <ModalNewTransaction isModalOpen={isOpen} onModalClose={onClose} />
    </Box>
  );
}
