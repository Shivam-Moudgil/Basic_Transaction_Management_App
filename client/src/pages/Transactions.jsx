import {
  Heading,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Box,
  Button,
  Flex,
  Spinner,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const Port = process.env.REACT_APP_API_URL;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${Port}/api`);
        setTransactions(response.data.data);
      } catch (error) {
        setError(error.message || "An error occurred while fetching data.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <Box  color={"white"} bg="gray.600" h={"100vh"}>
      <Box w={"80%"} m={"auto"}>
        <TableContainer>
          <Flex justifyContent="space-between" alignItems="center">
            <Heading  mt={10} mb={10}>
              Office Transactions
            </Heading>
            <Link to="/add-transaction">
              <Button>Add Transaction</Button>
            </Link>
          </Flex>
          {isLoading ? (
            <Spinner size="lg" color="blue.500" />
          ) : error ? (
            <Box color="red.500">Error: {error}</Box>
          ) : (
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th color={"white"}>Date</Th>
                  <Th color={"white"}>Description</Th>
                  <Th color={"white"}>Credit</Th>
                  <Th color={"white"}>Debit</Th>
                  <Th color={"white"}>Running Balance</Th>
                </Tr>
              </Thead>
              <Tbody>
                {transactions.map((transaction) => (
                  <Tr key={transaction._id}>
                    <Td color={"white"}>
                      {new Date(transaction.createdAt).toLocaleDateString()}
                    </Td>
                    <Td color={"white"}>{transaction.desc}</Td>
                    <Td color={"white"}>
                      {transaction.type === "credit" ? transaction.amount : "-"}
                    </Td>
                    <Td color={"white"}>
                      {transaction.type === "debit" ? transaction.amount : "-"}
                    </Td>
                    <Td color={"white"}>{transaction.balance}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          )}
        </TableContainer>
      </Box>
    </Box>
  );
};

export default Transactions;
