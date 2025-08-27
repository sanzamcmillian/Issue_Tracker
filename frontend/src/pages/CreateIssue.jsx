import { useState } from "react";
import { Box, Heading, Input, Textarea, Button, VStack } from "@chakra-ui/react";

function CreateIssue() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const issue = { title, description };

    try {
      const res = await fetch("http://localhost:8000/issues", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(issue),
      });

      if (!res.ok) {
        throw new Error("Failed to create issue");
      }

      const data = await res.json();
      console.log("Issue created:", data);
      alert("✅ Issue created successfully!");
      setTitle("");
      setDescription("");
    } catch (err) {
      console.error(err);
      alert("❌ Failed to create issue");
    }
  };

  return (
    <Box p={6}>
      <Heading mb={4}>Create Issue</Heading>
      <form onSubmit={handleSubmit}>
        <VStack spacing={4} align="stretch">
          <Input
            placeholder="Issue Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <Textarea
            placeholder="Issue Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          <Button colorScheme="blue" type="submit">
            Create
          </Button>
        </VStack>
      </form>
    </Box>
  );
}

export default CreateIssue;
