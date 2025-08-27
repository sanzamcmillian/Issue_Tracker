"use client";
import { Box, Heading, SimpleGrid, Text } from "@chakra-ui/react";
import OverviewCards from "./components/OverviewCards";
import IssuesTable from "./components/IssuesTable";

export default function Dashboard() {
  return (
    <Box p={6}>
      {/* Title */}
      <Heading color="gray.700" mb={6}>Issue Tracker</Heading>

      {/* Overview cards */}
      <OverviewCards />

      {/* Recent Issues */}
      <Box mt={10}>
        <Text fontSize="xl" fontWeight="bold" mb={4}>
          Recent Issues
        </Text>
        <IssuesTable />
      </Box>
    </Box>
  );
}
