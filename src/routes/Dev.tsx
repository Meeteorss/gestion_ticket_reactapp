import {
  Box,
  Button,
  Flex,
  Select,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { ClientSideBar, DevsSideBar } from "../components/SideBar";

import { useAuthContext } from "../context/AuthContext";
import { useGetDevsTickets } from "../hooks/useGetDevsTickets";
import useUpdateTicket from "../hooks/useUpdateTicket";

const StatusOptions = [
  { label: "Pending", value: "PENDING" },
  { label: "Open", value: "OPEN" },
  { label: "Resolved", value: "RESOLVED" },
  { label: "Canceled", value: "CANCELED" },
];
const Dev = () => {
  const { tickets } = useGetDevsTickets();
  const navigate = useNavigate();
  const { auth } = useAuthContext();
  const updateTicket = useUpdateTicket();
  const [status, setStatus] = useState({ id: null, status: "" });
  const toast = useToast();
  useEffect(() => {
    if (!auth.user || auth?.role !== "DEV") {
      navigate("/");
    }
  }, [auth, navigate]);

  return (
    <Flex bgColor={"#2e2e2e"} justifyContent={"center"} alignItems={"center"}>
      <Flex flexDirection={"row"} bgColor={"black"} w={1400}>
        <DevsSideBar />
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
                  <Th>Client</Th>
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
                    <Select
                      onChange={(e) => {
                        setStatus({ id: ticket.id, status: e.target.value });
                      }}
                      height={"72px"}
                      defaultValue={ticket.status}
                    >
                      {StatusOptions.map((s) => (
                        <option value={s.value}>{s.label}</option>
                      ))}
                    </Select>
                    {/* <Td>{ticket.status}</Td> */}
                    <Td>{ticket.client.username}</Td>
                    {status.id === ticket.id &&
                      status.status !== ticket.status && (
                        <Td>
                          {" "}
                          <Button
                            onClick={async () => {
                              const res = await updateTicket({
                                status: status.status,
                                ticketId: ticket.id,
                              });
                              if (res.data.ticket) {
                                toast({
                                  title: "Ticket updated.",
                                  description:
                                    "You've successfully updated this ticket.",
                                  status: "success",
                                  duration: 9000,
                                  isClosable: true,
                                });
                              } else {
                                toast({
                                  title: "failed.",
                                  description:
                                    "We couldn't update this ticket.",
                                  status: "error",
                                  duration: 9000,
                                  isClosable: true,
                                });
                              }
                            }}
                          >
                            Update
                          </Button>{" "}
                        </Td>
                      )}
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Dev;
