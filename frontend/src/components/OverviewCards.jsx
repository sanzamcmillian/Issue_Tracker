"use client";
import { SimpleGrid, Box, Text } from "@chakra-ui/react";

const stats = [
  { label: "Total Issues", value: 120 },
  { label: "Open", value: 45 },
  { label: "In Progress", value: 30 },
  { label: "Closed", value: 45 },
];

export default function OverviewCards() {
  return (
    <SimpleGrid columns={{ base: 1, md: 4 }} spacing={6}>
      {stats.map((stat, idx) => (
        <Box
          key={idx}
          p={6}
          bg="gray.700"
          rounded="xl"
          shadow="md"
          textAlign="center"
        >
          <Text color="gray.300" fontSize="3xl" fontWeight="bold">
            {stat.value}
          </Text>
          <Text color="gray.300">{stat.label}</Text>
        </Box>
      ))}
    </SimpleGrid>
  );
}
