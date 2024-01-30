"use client";

import {
    Box,
    Button,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Select,
    Stack,
    useColorModeValue,
    useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const obj = {
  type: "",
  amount: 0,
  desc: "",
};
export default function CreateTransaction() {
  const Port = process.env.REACT_APP_API_URL;
  const toast = useToast();
  const [form, setForm] = useState(obj);
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };
  const resetForm = () => setForm(obj);
  const { type, amount, desc } = form;

  const AddTransaction = async () => {
    try {
      if (!type || !amount || !desc) {
        toast({
            title: `Please fill all of the fields`,
            status: "info",
            isClosable: true,
            position:"top",
            duration:4000
          })
        return;
      }
      const res = await axios.post(`${Port}/api/create`, { ...form });
      if (res.data.success) {
        resetForm();
        navigate("/");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} w={"4xl"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"} textAlign={"center"}>
            Create Transaction
          </Heading>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack w="full" spacing={4}>
            <Box>
              <FormControl id="type" isRequired={true}>
                <FormLabel>Transaction Type</FormLabel>

                <Select
                  name="type"
                  value={type}
                  onChange={handleChange}
                  placeholder="Select type"
                >
                  <option value="credit">Credit</option>
                  <option value="debit">Debit</option>
                </Select>
              </FormControl>
            </Box>
            <Box>
              <FormControl id="amount" isRequired>
                <FormLabel>Amount</FormLabel>
                <Input
                  value={amount}
                  onChange={handleChange}
                  name="amount"
                  type="number"
                />
              </FormControl>
            </Box>
            <FormControl id="desc" isRequired>
              <FormLabel>Description</FormLabel>
              <Input
                value={desc}
                onChange={handleChange}
                name="desc"
                type="text"
              />
            </FormControl>

            <Flex justifyContent={"space-around"} gap={4} pt={2}>
              <Button
                w={"full"}
                onClick={AddTransaction}
                loadingText="Submitting"
                size="lg"
                bg={"blue.400"}
                color={"white"}
                _hover={{
                  bg: "blue.500",
                }}
              >
                Save
              </Button>
              <Button
                w={"full"}
                onClick={() => navigate("/")}
                loadingText="Submitting"
                size="lg"
                bg={"red.400"}
                color={"white"}
                _hover={{
                  bg: "red.500",
                }}
              >
                Cancel
              </Button>
            </Flex>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
