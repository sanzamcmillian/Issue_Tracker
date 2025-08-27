import { Box, Button, Heading, Input, Textarea, VStack, HStack } from "@chakra-ui/react";
import { useState } from "react";

function App() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [issues, setIssues] = useState([]);

  const handleAddIssue = () => {
    if (title && description) {
      setIssues([...issues, { title, description }]);
      setTitle("");
      setDescription("");
    }
  };

  return (
    <Box p={6}>
      {/* Navbar */}
      <Box bg="blue.500" color="white" p={4} mb={6}>
        <Heading size="md">Issue Tracker</Heading>
      </Box>

      {/* Form */}
      <VStack spacing={4} mb={6} align="stretch">
        <Input
          placeholder="Issue Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Textarea
          placeholder="Issue Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <Button colorScheme="blue" onClick={handleAddIssue}>
          Create Issue
        </Button>
      </VStack>

      {/* Issues List */}
      <VStack spacing={3} align="stretch">
        {issues.map((issue, index) => (
          <Box key={index} p={4} borderWidth="1px" borderRadius="md">
            <Heading size="sm">{issue.title}</Heading>
            <Box>{issue.description}</Box>
          </Box>
        ))}
      </VStack>
    </Box>
  );
}

export default App;

