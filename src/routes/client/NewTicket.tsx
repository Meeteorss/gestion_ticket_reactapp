import {
  Alert,
  Button,
  Flex,
  Select,
  SelectField,
  useToast,
} from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import React, { useState } from "react";
import InputField from "../../components/InputField";

import useCreateTicket from "../../hooks/useCreateTicket";

const UrgencyOptions = [
  { label: "Critical", value: "CRITICAL" },
  { label: "Urgent", value: "URGENT" },
  { label: "Normal", value: "NORMAL" },
  { label: "Not Urgent", value: "NOT_URGENT" },
];
const NewTicket = () => {
  const createTicket = useCreateTicket();
  const [urgency, setUrgency] = useState("");
  const toast = useToast();
  return (
    <Flex w={"full"} padding={4} bgColor={"#2e2e2e"}>
      <Formik
        initialValues={{
          software: "",
          environment: "",
          description: "",
        }}
        onSubmit={async (values, { setErrors, resetForm }) => {
          if (
            values.description &&
            values.environment &&
            values.software &&
            urgency
          ) {
            const res = await createTicket({ ...values, urgency });
            console.log("HEREe : ", res);
            if (res.data.ticket) {
              resetForm();
              setUrgency("");
              toast({
                title: "Ticket created.",
                description: "You've successfully created your ticket.",
                status: "success",
                duration: 9000,
                isClosable: true,
              });
            } else {
              toast({
                title: "failed.",
                description: "We couldn't create your ticket.",
                status: "error",
                duration: 9000,
                isClosable: true,
              });
            }
          } else {
            toast({
              title: "failed.",
              description: "All fields are required.",
              status: "error",
              duration: 9000,
              isClosable: true,
            });
          }

          //   if (!res.user) {
          //     setErrors({ password: "Invalid credentials." });
          //   } else {
          //     console.log(" here: ", res.data.role);
          //     // navigate(res.role);
          //     // setIsOpen(false);
          //   }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField
              name="software"
              placeholder="software"
              label="software"
            />
            <InputField
              name="environment"
              placeholder="environment"
              label="environment"
            />
            <InputField
              name="description"
              placeholder="description"
              label="description"
            />
            {/* <InputField name="urgency" placeholder="urgency" label="urgency" /> */}
            <Select
              value={urgency}
              onChange={(e) => {
                setUrgency(e.target.value);
              }}
              placeholder="Urgency..."
            >
              {UrgencyOptions.map((urgency) => (
                <option value={urgency.value}>{urgency.label}</option>
              ))}
            </Select>

            <Flex
              mt={"6"}
              mx={"auto"}
              w={"80%"}
              justifyContent={"space-between"}
            >
              <Button
                type={"submit"}
                bgColor={"#4f4f4f"}
                color={"white"}
                _hover={{
                  bgColor: "#404040",
                }}
              >
                Create
              </Button>
            </Flex>
          </Form>
        )}
      </Formik>
    </Flex>
  );
};

export default NewTicket;
