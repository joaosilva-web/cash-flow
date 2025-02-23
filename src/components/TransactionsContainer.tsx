import {
  Button,
  Container,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useDisclosure,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay
} from "@chakra-ui/react";
import { motion } from "motion/react";
import { useTransactions } from "../hooks/useTransactions";
import { Trash } from "@phosphor-icons/react";
import { useRef } from "react";
import { FocusableElement } from "@chakra-ui/utils";

interface IReusableTrProps {
  id: string;
  title: string;
  value: string;
  category: string;
  date: Date;
  type: "inflow" | "outflow";
}

const MotionContainer = motion(Container);

function ReusableTr({ id, category, date, title, type, value }: IReusableTrProps) {
  const { deleteTransaction } = useTransactions();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef<HTMLButtonElement>(null);

  return (
    <>
      <Tr h="4rem" borderRadius="8px">
        <Td bg="white" color="title" fontWeight="medium" borderTopLeftRadius="8px" borderBottomLeftRadius="8px">{title}</Td>
        <Td bg="white" color={type === "inflow" ? "green" : "red"}>{value}</Td>
        <Td bg="white" color="text">{category}</Td>
        <Td bg="white" color="text">{date.toLocaleString()}</Td>
        <Td bg="white" color="text" borderTopRightRadius="8px" borderBottomRightRadius="8px">
          <Button bg="transparent" _hover={{ color: "red" }} onClick={onOpen}>
            <Trash />
          </Button>
        </Td>
      </Tr>
      
      <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef as React.RefObject<FocusableElement>} onClose={onClose}>
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">Delete Transaction</AlertDialogHeader>
            <AlertDialogBody>Are you sure you want to delete this transaction? This action cannot be undone.</AlertDialogBody>
            <AlertDialogFooter>
              <Button bg="blue" color="white"_hover={{bg: "blue"}} ref={cancelRef} onClick={onClose}>Cancel</Button>
              <Button bg="red" color="white" _hover={{bg: "red"}}onClick={() => { deleteTransaction(id); onClose(); }} ml={3}>Delete</Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}

export function TransactionsContainer() {
  const { transactions } = useTransactions();

  return (
    <MotionContainer maxW="1120px" padding="0" paddingTop="2rem" initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.5 }}>
      <TableContainer w="100%">
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th color="text" fontWeight="normal">Title</Th>
              <Th color="text" fontWeight="normal">Value</Th>
              <Th color="text" fontWeight="normal">Category</Th>
              <Th color="text" fontWeight="normal">Date</Th>
              <Th color="text" fontWeight="normal">Delete</Th>
            </Tr>
          </Thead>
          <Tbody>
            {transactions.map((transaction) => (
              <>
                <ReusableTr key={transaction.id} {...transaction} />
                <Tr>
                  <Td colSpan={4} h="0.5rem" padding="0" bg="transparent" />
                </Tr>
              </>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </MotionContainer>
  );
}
