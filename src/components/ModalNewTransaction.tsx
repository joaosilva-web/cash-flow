import {
  Button,
  ButtonGroup,
  FormControl,
  FormErrorMessage,
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
import { useState } from "react";
import { useTransactions } from "../hooks/useTransactions";
import { useReward } from "react-rewards";
import useSound from "use-sound";

// Importando sons
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

  const [isSubmittingForm, setIsSubmittingForm] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    value: "",
    category: "",
    type: "",
  });

  const [errors, setErrors] = useState({
    title: false,
    value: false,
    category: false,
    type: false,
  });

  // Hooks
  const { reward: rewardInflow } = useReward("rewardId", "emoji", {
    emoji: ["🤑", "💲", "📈"],
    lifetime: 100,
  });
  const { reward: rewardOutflow } = useReward("rewardOutflow", "emoji", {
    emoji: ["💸", "😭", "📉"],
    lifetime: 100,
  });
  
  const [playCashIn] = useSound(cashInSound, { volume: 0.2 });
  const [playCashOut] = useSound(cashOutSound);
  const [playCashRegister] = useSound(cashRegister, { volume: 0.2 });
  
  // Custom hooks
  const { addTransaction } = useTransactions();


  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    setErrors({ ...errors, [e.target.name]: false });
  }

  function validateForm() {
    const newErrors = {
      title: !formData.title.trim(),
      value: !formData.value.trim(),
      category: !formData.category.trim(),
      type: !formData.type.trim(),
    };

    setErrors(newErrors);
    return !Object.values(newErrors).includes(true);
  }

  async function handleSubmitNewTransactionForm(
    e: React.FormEvent<HTMLDivElement>
  ) {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmittingForm(true);
    addTransaction({
      title: formData.title,
      value: formData.value,
      category: formData.category,
      type: formData.type as "inflow" | "outflow",
    });

    await new Promise((resolve) => setTimeout(resolve, 500));
    playCashRegister();

    setIsSubmittingForm(false);
    onModalClose();
    setFormData({ title: "", value: "", category: "", type: "" });
  }

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
          <FormControl as="form" onSubmit={handleSubmitNewTransactionForm}>
            <VStack spacing="1rem">
              <FormControl isInvalid={errors.title}>
                <Input
                  name="title"
                  h="64px"
                  placeholder="Title"
                  type="text"
                  value={formData.title}
                  onChange={handleInputChange}
                />
                {errors.title && <FormErrorMessage color="red">Title is required.</FormErrorMessage>}
              </FormControl>

              <FormControl isInvalid={errors.value}>
                <Input
                  name="value"
                  h="64px"
                  placeholder="Value"
                  type="text"
                  value={formData.value}
                  onChange={handleInputChange}
                />
                {errors.value && <FormErrorMessage color="red">Value is required.</FormErrorMessage>}
              </FormControl>

              <ButtonGroup w="100%">
                <Button
                  bg="white"
                  border="2px solid"
                  borderColor={formData.type === "inflow" ? "green" : "gray.300"}
                  flex="1"
                  h="64px"
                  _hover={{ borderColor: "green" }}
                  _focus={{ borderColor: "green", backgroundColor: "transparent" }}
                  onClick={() => {
                    setFormData({ ...formData, type: "inflow" });
                    setErrors({ ...errors, type: false });
                    rewardInflow();
                    playCashIn();
                  }}
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
                  borderColor={formData.type === "outflow" ? "red" : "gray.300"}
                  flex="1"
                  h="64px"
                  _hover={{ borderColor: "red" }}
                  _focus={{ borderColor: "red" }}
                  onClick={() => {
                    setFormData({ ...formData, type: "outflow" });
                    setErrors({ ...errors, type: false });
                    rewardOutflow();
                    playCashOut();
                  }}
                >
                  <span id="rewardOutflow" />
                  <Flex align="center" gap="0.5rem">
                    <Icon as={ArrowCircleDown} color="red" h="24px" w="24px" />
                    <Text>Outflow</Text>
                  </Flex>
                </Button>
              </ButtonGroup>
              {errors.type && <Text color="red">Type is required.</Text>}

              <FormControl isInvalid={errors.category}>
                <Input
                  name="category"
                  type="text"
                  h="64px"
                  placeholder="Category"
                  value={formData.category}
                  onChange={handleInputChange}
                />
                {errors.category && <FormErrorMessage color="red">Category is required.</FormErrorMessage>}
              </FormControl>

              <Button
                isLoading={isSubmittingForm}
                bg="blue"
                color="white"
                height="64px"
                marginTop="1.25rem"
                marginBottom="1rem"
                type="submit"
                w="100%"
                _hover={{
                  backgroundColor: "blue.900",
                  transform: "scale(1.01)",
                }}
                _focus={{ backgroundColor: "blue" }}
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
