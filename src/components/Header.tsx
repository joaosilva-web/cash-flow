import {
  Box,
  Button,
  ButtonGroup,
  Container,
  Flex,
  FormControl,
  Heading,
  Icon,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  Text,
  VStack,
} from "@chakra-ui/react";
import logo from "../assets/logo.svg";
import { ArrowCircleDown, ArrowCircleUp } from "@phosphor-icons/react";
import { useReward } from "react-rewards";

interface IModalNewTransactionProps {
  isModalOpen: boolean;
  onModalClose: () => void;
}

function ModalNewTransaction({
  isModalOpen,
  onModalClose,
}: IModalNewTransactionProps) {
  const { reward: rewardInflow } = useReward("rewardId", "emoji", {
    emoji: ["🤑", "💲", "📈"],
    lifetime: 100,
  });
  const { reward: rewardOutflow } = useReward("rewardOutflow", "emoji", {
    emoji: ["💸", "😭", "📉"],
    lifetime: 100,
  });

  return (
    <Modal isOpen={isModalOpen} onClose={onModalClose}>
      <ModalOverlay maxH="100vh" />
      <ModalContent w="576px">
        <ModalCloseButton />
        <ModalHeader paddingTop="4rem" paddingBottom="2rem">
          <Heading as="h2" color="title" fontSize="1.25rem">
            Register Transaction
          </Heading>
        </ModalHeader>
        <ModalBody>
          {/* Formulário para adicionar nova transação */}
          <FormControl>
            <VStack spacing="1rem">
              <Input h="64px" placeholder="Title" type="text" />
              <Input h="64px" placeholder="Value" type="text" />
              <ButtonGroup w="100%">
                <Button
                  bg="white"
                  border="2px solid"
                  borderColor="gray.300"
                  borderWidth="1px"
                  flex="1"
                  h="64px"
                  _hover={{ borderWidth: "2px", borderColor: "green" }}
                  _focus={{
                    borderWidth: "2px",
                    borderColor: "green",
                    backgroundColor: "transparent",
                  }}
                  onClick={rewardInflow}
                  // disabled={isAnimating}
                >
                  <span id="rewardId" />
                  <Flex align="center" gap="0.5rem">
                    <Icon as={ArrowCircleUp} color="green" h="24px" w="24px" />
                    <Text>Inflow</Text>
                  </Flex>
                </Button>
                <Button
                  border="2px solid"
                  bg="white"
                  borderColor="gray.300"
                  borderWidth="1px"
                  flex="1"
                  h="64px"
                  _hover={{ borderWidth: "2px", borderColor: "red" }}
                  _focus={{ borderWidth: "2px", borderColor: "red" }}
                  onClick={rewardOutflow}
                  //   onClick={() => setTransactionType("inflow")}
                >
                  <span id="rewardOutflow" />
                  <Flex align="center" gap="0.5rem">
                    <Icon as={ArrowCircleDown} color="red" h="24px" w="24px" />
                    <Text>Outflow</Text>
                  </Flex>
                </Button>
              </ButtonGroup>
              <Input type="text" h="64px" placeholder="Category" />
              <Button
                bg="green"
                color="white"
                height="64px"
                marginTop="1.25rem"
                marginBottom="1rem"
                type="submit"
                w="100%"
                _hover={{
                  backgroundColor: "green.900",
                  transform: "scale(1.01)",
                }}
                _focus={{ backgroundColor: "green" }}
              >
                Register
              </Button>
            </VStack>
          </FormControl>
        </ModalBody>
      </ModalContent>
      <ModalFooter>
        <Button variant="outline" onClick={() => {}}>
          Cancel
        </Button>
        <Button>Save</Button>
      </ModalFooter>
    </Modal>
  );
}

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
        <Button onClick={onOpen}>New Transaction</Button>
      </Container>
      <ModalNewTransaction isModalOpen={isOpen} onModalClose={onClose} />
    </Box>
  );
}
