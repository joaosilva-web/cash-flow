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
import { useState } from "react";
import { motion } from "motion/react";

import {useTransactions} from "../hooks/useTransactions"

interface IModalNewTransactionProps {
  isModalOpen: boolean;
  onModalClose: () => void;
}

export function ModalNewTransaction({
  isModalOpen,
  onModalClose,
}: IModalNewTransactionProps) {
  // React hooks
  const [isSubmittingForm, setIsSubmittingForm] = useState(false);
  const [submitCompleted, setSubmitCompleted] = useState(false);
  const [formData, setFormData] = useState<{title: string;
    value: string;
    category: string;
    type: "inflow" | "outflow" | "";}>({
    title: "",
    value: "",
    category: "",
    type: "", // "inflow" ou "outflow"
  });


  // Custom hooks
  const { transactions, setTransactions } = useTransactions();

  // Rewards hooks
  const { reward: rewardInflow } = useReward("rewardId", "emoji", {
    emoji: ["🤑", "💲", "📈"],
    lifetime: 100,
  });
  const { reward: rewardOutflow } = useReward("rewardOutflow", "emoji", {
    emoji: ["💸", "😭", "📉"],
    lifetime: 100,
  });

  // Songs hooks
  const [playCashIn] = useSound(cashInSound, { volume: 0.2 });
  const [playCashOut] = useSound(cashOutSound);
  const [playCashRegister] = useSound(cashRegister, { volume: 0.2 });

  const chekMarkPathVariants = {
    hidden: {
      opacity: 0,
      pathLength: 0,
    },
    visible: {
      opacity: 1,
      pathLength: 1,
      transition: { duration: 1, ease: "easeOut" },
    },
  };

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  async function handleSubmitNewTransactionForm(
    e: React.FormEvent<HTMLDivElement>
  ) {
    e.preventDefault();
    setIsSubmittingForm(true);
    setTransactions([...transactions, {...formData, id: "0", date: new Date(), type: formData.type as "inflow" | "outflow", }])

    await new Promise((resolve) => setTimeout(resolve, 500));
    playCashRegister();
    setIsSubmittingForm(false);
    setSubmitCompleted(true);

    await new Promise((resolve) => setTimeout(resolve, 1000));
    setSubmitCompleted(false);
    setIsSubmittingForm(false);
    onModalClose();

    setFormData({
      title: "",
      value: "",
      category: "",
      type: "",
    });
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
              <Input name="title" h="64px" placeholder="Title" type="text" value={formData.title} onChange={handleInputChange}/>
              <Input name="value" h="64px" placeholder="Value" type="text" value={formData.value} onChange={handleInputChange}/>
              <ButtonGroup w="100%">
                <Button
                  bg="white"
                  border="2px solid"
                  borderColor={formData.type === "inflow"? 'green' : 'gray.300'}
                  flex="1"
                  h="64px"
                  _hover={{ borderColor: "green" }}
                  _focus={{
                    borderColor: "green",
                    backgroundColor: "transparent",
                  }}
                  onClick={() => {
                    setFormData({...formData, type: "inflow"})
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
                  borderColor={formData.type === 'outflow'? 'red' : 'gray.300'}
                  flex="1"
                  h="64px"
                  _hover={{ borderColor: "red" }}
                  _focus={{ borderColor: "red" }}
                  onClick={() => {
                    setFormData({...formData, type: "outflow"})
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
              <Input name="category" type="text" h="64px" placeholder="Category" value={formData.category} onChange={handleInputChange}/>
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
                {!submitCompleted ? (
                  "Register"
                ) : (
                  <svg
                    width="31"
                    height="25"
                    viewBox="0 0 31 25"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <motion.path
                      d="M13.7172 23.7674L13.7173 23.7673L29.766 7.7186C29.7662 7.71835 29.7665 7.71809 29.7667 7.71784C30.0006 7.48549 30.1862 7.20917 30.3128 6.9048C30.4396 6.6001 30.5048 6.27331 30.5047 5.94327C30.5045 5.61324 30.4391 5.28651 30.312 4.98192C30.1849 4.67733 29.9988 4.4009 29.7644 4.16859L29.7623 4.16655L27.2717 1.72712C27.2712 1.72658 27.2706 1.72605 27.2701 1.72551C26.8016 1.25946 26.1677 0.997803 25.5068 0.997803C24.8456 0.997803 24.2113 1.25976 23.7428 1.7263C23.7425 1.72657 23.7423 1.72684 23.742 1.72712L11.9968 13.3279L7.25656 8.73075C6.78827 8.26571 6.15504 8.00468 5.49497 8.00468C4.83374 8.00468 4.19945 8.26663 3.73091 8.73321L3.73017 8.73395L1.23017 11.2339L1.2299 11.2342C0.761887 11.703 0.499023 12.3383 0.499023 13.0006C0.499023 13.6629 0.761777 14.298 1.2296 14.7667C1.2297 14.7668 1.2298 14.7669 1.2299 14.767L10.1817 23.7664L10.1828 23.7674C10.6516 24.2359 11.2872 24.4991 11.95 24.4991C12.6127 24.4991 13.2484 24.2359 13.7172 23.7674Z"
                      fill="transparent"
                      stroke="white"
                      variants={chekMarkPathVariants}
                      initial="hidden"
                      animate="visible"
                    />
                  </svg>
                )}
              </Button>
            </VStack>
          </FormControl>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
