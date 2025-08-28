import React from "react";
import ReactDOM from "react-dom/client";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import CreateIssue from "./pages/CreateIssue.jsx";
import EditIssue from "./pages/EditIssue.jsx";
import ViewIssue from "./pages/ViewIssue.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ChakraProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<CreateIssue />} />
          <Route path="issues/:id/edit" element={<EditIssue />} />
          <Route path="/issues/:id" element={<ViewIssue />} />
        </Routes>
      </Router>
    </ChakraProvider>
  </React.StrictMode>
);