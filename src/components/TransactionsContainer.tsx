import {
    Container,
    Table,
    TableContainer,
    Tbody,
    Td,
    Th,
    Thead,
    Tr,
  } from "@chakra-ui/react";

  interface IReusableTrProps {
    title: string;
    value: string;
    category: string;
    date: Date;
    type: "inflow" | "outflow";
  }

//component to reutilize the stylized Tr
  function ReusableTr({category, date, title, type, value}:IReusableTrProps) {
    return(
            <Tr h="4rem" borderRadius="8px">
                <Td bg="white" color="title" fontWeight="medium" borderTopLeftRadius="8px" borderBottomLeftRadius="8px">{title}</Td>
                <Td bg="white" color={type === "inflow"? "green" : "red"}>{value}</Td>
                <Td bg="white" color="text">{category}</Td>
                <Td bg="white" color="text" borderTopRightRadius="8px" borderBottomRightRadius="8px">{date.toLocaleString()}</Td>
              </Tr>
    )
  }
  
  export function TransactionsContainer() {
    return (
      <Container maxW="1120px" padding="0" paddingTop="2rem">
        <TableContainer w="100%">
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th color="text" fontWeight="normal">Title</Th>
                <Th color="text" fontWeight="normal">Value</Th>
                <Th color="text" fontWeight="normal">Category</Th>
                <Th color="text" fontWeight="normal">Date</Th>
              </Tr>
            </Thead>
            <Tbody>
              <ReusableTr type="inflow" title="Desenvolvimento de site" value="R$ 12.000,00" category="Venda" date={new Date()}/>
              {/* invisible line to spacing */}
              <Tr>
                <Td colSpan={4} h="0.5rem" padding="0" bg="transparent" />
              </Tr>
            </Tbody>
          </Table>
        </TableContainer>
      </Container>
    );
  }
  