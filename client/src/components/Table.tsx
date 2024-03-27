import React from 'react';
import {
  Table as ChakraTable,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Spinner
} from '@chakra-ui/react';
import { Datum } from '../types';

const Table = ({
  data = [],
  isLoading,
  isError,
  isSuccess,
}: {
  data: Datum[];
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
}) => {
  return (
    <div>
      {isError && (
        <Alert status="error">
          <AlertIcon />
          <AlertTitle>Your browser is outdated!</AlertTitle>
          <AlertDescription>
            Your Chakra experience may be degraded.
          </AlertDescription>
        </Alert>
      )}
      {isLoading && <Spinner size="xl" />}
      {isSuccess && (
        <TableContainer>
          <ChakraTable variant="simple">
            <Thead>
              <Tr>
                <Th>NO</Th>
                <Th>fullName</Th>
                <Th>gender</Th>
              </Tr>
            </Thead>
            <Tbody>
              {data.map((d, index) => {
                return (
                  <Tr key={d.id}>
                    <Td>{index}</Td>
                    <Td>{d.fullName}</Td>
                    <Td>{d.gender}</Td>
                  </Tr>
                );
              })}
            </Tbody>
          </ChakraTable>
        </TableContainer>
      )}
    </div>
  );
};

export default Table;
