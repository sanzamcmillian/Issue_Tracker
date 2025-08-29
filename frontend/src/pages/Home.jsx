
import { use, useEffect, useState } from "react";
import { getIssues, deleteIssue } from "../api/issues";
import { Link as RouterLink } from "react-router-dom";
import {
  Box,
  Heading,
  Spinner,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  Text,
  Alert,
  AlertIcon,
  useToast,
  usePrevious,
  Stack,
  Select,
  Input,
} from "@chakra-ui/react";
import StatusChart from "../components/StatusChart";
import { statusLabels } from "../utilities/statusLabels";
import { formatDate } from "../utilities/formatDate";

export default function Home() {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [statusFilter, setStatusFilter] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("");
  const [sortBy, setSortBy] = useState("created_at");
  const [searchQuery, setQuerySearch] = useState("");

  const toast = useToast();

  const fetchIssues = async () => {
    setLoading(true);
    try {
        const params = {
            status: statusFilter || undefined,
            priority: priorityFilter || undefined,
            sort_by: sortBy,
        };

        const data = await getIssues(params);
        setIssues(data);
    } catch (error) {
        toast({
            title: "Error fetching issues",
            status: "error",
            duration: 3000,
            isClosable: true,
        });
    } finally {
        setLoading(false);
    }
  };

    useEffect(() => {
        fetchIssues();
    }, [statusFilter, priorityFilter, sortBy]);

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this issue?")) return;

        try {
            await deleteIssue(id);
            setIssues((prev) => prev.filter((issue) => issue.id !== id));
            toast({
                title: "Issue deleted",
                status: "success",
                duration: 3000,
                isClosable: true,
            });
        } catch (error) {
            toast({
                title: "Error deleting issue",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        }
    };

    const filteredIssues = issues.filter((issue) => 
        issue.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (loading) return <Spinner size="x1" />

  return (
    <Box p={6}>
        <Heading as="h1" size="2xl" mb={6} textAlign="center" color="teal.500">
            Issue Tracker
        </Heading>
        <Box mb={6}>
            <StatusChart issues={filteredIssues} />
        </Box>
        <Stack direction={["column", "row"]} spacing={4} mb={4}>
            <Input
                placeholder="Search by title..."
                value={searchQuery}
                onChange={(e) => setQuerySearch(e.target.value)}
            />

            <Select
                placeholder="Filter by Status"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
            >
                <option value="open">Open</option>
                <option value="in_progress">In Progress</option>
                <option value="closed">Closed</option>
            </Select>

            <Select
                placeholder="Filter by Priority"
                value={priorityFilter}
                onChange={(e) => setPriorityFilter(e.target.value)}
            >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
            </Select>

            <Select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                <option value="created_at">Sort by Created</option>
                <option value="updated_at">Sort by Updated</option>
                <option value="priority">Sort by Priority</option>
            </Select>

        </Stack>

        <Button colorScheme="teal" mb={4} as={RouterLink} to="/create" mt={["2", "0"]}>
            + Create Issue
        </Button>

        {loading ? (
            <Spinner size="x1" />
        ) : (

        <Table variant="striped" colorScheme="gray">
            <Thead>
                <Tr>
                    <Th>Title</Th>
                    <Th>Status</Th>
                    <Th>Priority</Th>
                    <Th>{sortBy === "created" ? "Created Date": "Updated Date"}</Th>
                    <Th>Actions</Th>
                </Tr>
            </Thead>
            <Tbody>
                {filteredIssues.map((issue) => (
                    <Tr key={issue.id}>
                        <Td>{issue.title}</Td>
                        <Td>{statusLabels(issue.status)}</Td>
                        <Td>{issue.priority}</Td>
                        <Td>{sortBy === "created_at" ? formatDate(issue.created_at) : formatDate(issue.updated_at)}</Td>
                    <Td>
                        <Stack direction="row" spacing={2}>
                            <Button size="sm" colorScheme="blue" as={RouterLink} to={`/issues/${issue.id}`}>
                                View
                            </Button>
                            <Button size="sm" colorScheme="green" as={RouterLink} to={`/issues/${issue.id}/edit`}>
                                Edit
                            </Button>
                            <Button size="sm" colorScheme="red" onClick={() => handleDelete(issue.id)}>
                                Delete
                            </Button>
                        </Stack>
                    </Td>
                </Tr>
                ))}
            </Tbody>
        </Table>
        )}
    </Box>
  );
}