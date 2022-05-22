import {
  Flex,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import React from "react";
import { useGetClientsTickets } from "../../hooks/useGetClientsTickets";

const Tickets = () => {
  const { tickets } = useGetClientsTickets();
  //   console.log("TICKETS ", tickets);

  return (
    <Flex w={"full"} padding={4} bgColor={"#2e2e2e"}>
      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>ID</Th>
              <Th>Software</Th>
              <Th>Environment</Th>
              <Th>Description</Th>
              <Th>Urgency</Th>
              <Th>Status</Th>
              <Th>Dev</Th>
            </Tr>
          </Thead>
          <Tbody>
            {tickets?.map((ticket, idex) => (
              <Tr>
                <Td>{ticket.id}</Td>
                <Td>{ticket.incident.software}</Td>
                <Td>{ticket.incident.environment}</Td>
                <Td>{ticket.incident.description}</Td>
                <Td>{ticket.incident.urgency}</Td>
                <Td>{ticket.status}</Td>
                <Td>{ticket.dev ? ticket.dev.username : "-"}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Flex>
  );
};

export default Tickets;
