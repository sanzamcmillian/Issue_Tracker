import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getIssue, updateIssue } from "../api/issues";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  Textarea,
  Heading,
  Spinner,
  useToast,
} from "@chakra-ui/react";

export default function EditIssue() {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("open");
  const [priority, setPriority] = useState("medium");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const toast = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchIssue = async () => {
      try {
        const data = await getIssue(id);
        setTitle(data.title);
        setDescription(data.description);
        setStatus(data.status);
        setPriority(data.priority);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      await updateIssue(id, { title, description, status, priority });
      toast({
        title: "Issue updated",
        description: "Your issue has been updated successfully.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      navigate("/");
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update issue.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <Spinner size="xl" />;

  return (
    <Box p={6} maxW="lg" mx="auto">
      <Heading mb={6}>Edit Issue</Heading>
      <form onSubmit={handleSubmit}>
        <FormControl mb={4} isRequired>
          <FormLabel>Title</FormLabel>
          <Input value={title} onChange={(e) => setTitle(e.target.value)} />
        </FormControl>

        <FormControl mb={4}>
          <FormLabel>Description</FormLabel>
          <Textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </FormControl>

        <FormControl mb={4}>
          <FormLabel>Status</FormLabel>
          <Select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="open">Open</option>
            <option value="in_progress">In Progress</option>
            <option value="closed">Closed</option>
          </Select>
        </FormControl>

        <FormControl mb={4}>
          <FormLabel>Priority</FormLabel>
          <Select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </Select>
        </FormControl>

        <Button type="submit" colorScheme="green" isLoading={saving}>
          Update Issue
        </Button>
      </form>
    </Box>
  );
}
