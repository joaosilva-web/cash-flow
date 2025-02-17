import {
    Button,
    ButtonGroup,
    FormControl,
    Heading,
    Icon,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    Text,
    VStack,
    Flex,
  } from "@chakra-ui/react";
  import { ArrowCircleDown, ArrowCircleUp } from "@phosphor-icons/react";
  import { useReward } from "react-rewards";
  import useSound from "use-sound";

  //import songs
  import cashInSound from "../assets/sounds/man-happy.wav";
  import cashOutSound from "../assets/sounds/man-sad.wav";
  import cashRegister from "../assets/sounds/cash-register.mp3";
  
  interface IModalNewTransactionProps {
    isModalOpen: boolean;
    onModalClose: () => void;
  }
  
  export function ModalNewTransaction({
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

    // Songs hooks
    
  const [playCashIn] = useSound(cashInSound);
  const [playCashOut] = useSound(cashOutSound);
  const [playCashRegister] = useSound(cashRegister);
  
    return (
      <Modal isOpen={isModalOpen} onClose={onModalClose}>
        <ModalOverlay />
        <ModalContent w="576px">
          <ModalCloseButton />
          <ModalHeader paddingTop="4rem" paddingBottom="2rem">
            <Heading as="h2" color="title" fontSize="1.25rem">
              Register Transaction
            </Heading>
          </ModalHeader>
          <ModalBody>
            <FormControl as="form" onSubmit={(e) => { e.preventDefault(); playCashRegister()}}>
              <VStack spacing="1rem">
                <Input h="64px" placeholder="Title" type="text" />
                <Input h="64px" placeholder="Value" type="text" />
                <ButtonGroup w="100%">
                  <Button
                    bg="white"
                    border="2px solid"
                    borderColor="gray.300"
                    flex="1"
                    h="64px"
                    _hover={{ borderColor: "green" }}
                    _focus={{ borderColor: "green", backgroundColor: "transparent" }}
                    onClick={() => {rewardInflow(); playCashIn()}}
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
                    flex="1"
                    h="64px"
                    _hover={{ borderColor: "red" }}
                    _focus={{ borderColor: "red" }}
                    onClick={() => {rewardOutflow(); playCashOut()}}
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
      </Modal>
    );
  }
  