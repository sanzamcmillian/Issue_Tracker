## Issue Tracker Frontend

This is the frontend for the Issue Tracker application, built with React, Chakra UI, and React Router. It connects to a FastAPI backend to provide full CRUD functionality for managing issues

---

## Features
- Dashboard displaying all issues with dynamic filters, sorting, and search.
- Create, View, Edit, and Delete issues.
- Dynamic Pie Chart showing issue statuses (Open, In Progress, Closed) that updates automatically with CRUD operations.
- Responsive and mobile-friendly UI with Chakra UI.
- Client-side routing with React Router.
- Clean and maintainable component-based architecture.

---

## Technologies Used

- Frontend: React, React Router, Chakra UI, Axios, Recharts
- Styling: Chakra UI components and layout utilities
- Charts: Recharts for dynamic visualization
- HTTP Client: Axios for API requests
- State Management: React useState and useEffect hooks

---

## Getting Started

1. Clone the repository
```bash

git clone https://github.com/sanzamcmillian/Issue_Tracker.git
cd Issue_Tracker/frontend
```
2. Install dependencies
```bash

npm install
```
3. Start the development server
```bash

npm run dev
```
4. Access the app
```text
Open your browser and navigate to: http://localhost:5173
```

---
## API Integration
- Base URL: http://localhost:8000/api/v1/issues
- CRUD operations
  - GET / List all issues
  - GET /:id View issue details
  - POST / Create new issue
  - PUT /:id Update an issue
  - DELETE /:id Delete an issue
- Filters, sorting, and search are supported via query parameters

---
## Author
Sanele Skhosana