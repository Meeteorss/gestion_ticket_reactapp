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
import useAssignTicket from "../hooks/useAssignTicket";
import { useGetAllDevs } from "../hooks/useGetAllDevs";
import { useGetDevsTickets } from "../hooks/useGetDevsTickets";
import { useGetPendingTickets } from "../hooks/useGetPendingTickets";
import useUpdateTicket from "../hooks/useUpdateTicket";

const StatusOptions = [
  { label: "Pending", value: "PENDING" },
  { label: "Open", value: "OPEN" },
  { label: "Resolved", value: "RESOLVED" },
  { label: "Canceled", value: "CANCELED" },
];
const Admin = () => {
  const { tickets, refetch } = useGetPendingTickets();
  const { devs } = useGetAllDevs();
  const navigate = useNavigate();
  const { auth } = useAuthContext();
  const assignTicket = useAssignTicket();
  const [ticket, setTicket] = useState({ ticketId: null, devId: null });
  const toast = useToast();
  useEffect(() => {
    if (!auth.user || auth?.role !== "ADMIN") {
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
                  <Th>Assign to</Th>
                </Tr>
              </Thead>
              <Tbody>
                {tickets?.map((t, idex) => (
                  <Tr>
                    <Td>{t.id}</Td>
                    <Td>{t.incident.software}</Td>
                    <Td>{t.incident.environment}</Td>
                    <Td>{t.incident.description}</Td>
                    <Td>{t.incident.urgency}</Td>
                    <Td>{t.status}</Td>
                    {/* <Td>{ticket.status}</Td> */}
                    <Select
                      placeholder="Dev..."
                      onChange={(e) => {
                        setTicket({
                          devId: e.target.value,
                          ticketId: t.id,
                        });
                        console.log("TICKET: ", ticket);
                      }}
                      height={"72px"}
                    >
                      {devs?.map((dev) => (
                        <option value={dev.id}>{dev.username}</option>
                      ))}
                    </Select>
                    <Td>{t.client.username}</Td>
                    {ticket.ticketId &&
                      ticket.devId &&
                      ticket.ticketId === t.id && (
                        <Td>
                          {" "}
                          <Button
                            onClick={async () => {
                              const res = await assignTicket({
                                devId: ticket.devId,
                                ticketId: ticket.ticketId,
                              });
                              if (res.data.ticket) {
                                toast({
                                  title: "Ticket updated.",
                                  description:
                                    "You've successfully Assigned this ticket.",
                                  status: "success",
                                  duration: 9000,
                                  isClosable: true,
                                });
                                await refetch();
                              } else {
                                toast({
                                  title: "failed.",
                                  description:
                                    "We couldn't assign this ticket.",
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

export default Admin;
