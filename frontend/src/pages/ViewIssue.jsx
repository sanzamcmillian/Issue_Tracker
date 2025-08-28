import { useEffect, useState } from "react";
import { useParams, useNavigate, Link as RouterLink } from "react-router-dom";
import { getIssue } from "../api/issues";
import {
  Box,
  Heading,
  Text,
  Badge,
  Spinner,
  Button,
  Stack,
  useToast,
} from "@chakra-ui/react";

export default function ViewIssue() {
  const { id } = useParams();
  const [issue, setIssue] = useState(null);
  const [loading, setLoading] = useState(true);
  const toast = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchIssue = async () => {
      try {
        const data = await getIssue(id);
        setIssue(data);
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to load issue.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchIssue();
  }, [id]);

  if (loading) return <Spinner size="xl" />;

  if (!issue) return <Text>No issue found.</Text>;

  return (
    <Box p={6} maxW="lg" mx="auto">
      <Heading mb={4}>{issue.title}</Heading>
      <Text mb={2}>
        <strong>Description:</strong> {issue.description || "No description"}
      </Text>
      <Stack direction="row" mb={2}>
        <Badge colorScheme="blue">Status: {issue.status}</Badge>
        <Badge colorScheme="purple">Priority: {issue.priority}</Badge>
      </Stack>
      <Stack direction="row" spacing={2} mt={4}>
        <Button
          as={RouterLink}
          to={`/issues/${issue.id}/edit`}
          colorScheme="green"
        >
          Edit
        </Button>
        <Button colorScheme="red" onClick={() => navigate(-1)}>
          Back
        </Button>
      </Stack>
    </Box>
  );
}
