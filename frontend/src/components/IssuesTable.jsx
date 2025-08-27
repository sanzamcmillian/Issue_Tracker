"use client";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Badge,
} from "@chakra-ui/react";

const issues = [
  { title: "Login button not working", status: "Open", priority: "High", date: "2025-08-20", assignee: "John" },
  { title: "UI alignment bug", status: "In Progress", priority: "Medium", date: "2025-08-21", assignee: "Alice" },
  { title: "Database timeout", status: "Closed", priority: "High", date: "2025-08-18", assignee: "Michael" },
];

export default function IssuesTable() {
  return (
    <TableContainer>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Title</Th>
            <Th>Status</Th>
            <Th>Priority</Th>
            <Th>Date</Th>
            <Th>Assigned To</Th>
          </Tr>
        </Thead>
        <Tbody>
          {issues.map((issue, idx) => (
            <Tr key={idx}>
              <Td>{issue.title}</Td>
              <Td>
                <Badge
                  colorScheme={
                    issue.status === "Open"
                      ? "red"
                      : issue.status === "In Progress"
                      ? "yellow"
                      : "green"
                  }
                >
                  {issue.status}
                </Badge>
              </Td>
              <Td>{issue.priority}</Td>
              <Td>{issue.date}</Td>
              <Td>{issue.assignee}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
}
