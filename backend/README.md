# Issue Tracker API

A FastAPI-based RESTful API for managing issues with support for filtering, sorting, and input validation. This API demonstrates clean architecture, versioning, and comprehensive testing.

## Features

- Create, read, update, and delete issues  
- Filter issues by `status` and `priority`  
- Sort issues by `priority`, `created_at`, or `updated_at`  
- API versioning (`v1`) for future-proofing  
- Input validation using Pydantic enums  
- Comprehensive pytest test coverage  

---

## Tech Stack

- Python 3.13  
- FastAPI  
- SQLAlchemy ORM  
- SQLite
- Pydantic for data validation  
- Uvicorn as ASGI server  
- Pytest for testing  

---

## Getting Started

1. Clone the repository:

```bash

git clone https://github.com/sanzamcmillian/Issue_Tracker
cd backend
```

2. Create a virtual environment and activate it:
```bash

python -m venv venv
source venv/bin/activate
```

3. Install dependencies:
```bash

pip install -r requirements.txt
```

4. Run the API:
```bash

uvicorn app.main:app --reload
```

5. Access Swagger docs:
```bash

http://localhost:8000/docs
```

---

## API Endpoints

Create Issue

```text
POST /api/v1/issues/

Request Body:

{
  "title": "Issue title",
  "description": "Optional description",
  "status": "open",
  "priority": "medium"
}

Response:

{
  "id": 1,
  "title": "Issue title",
  "description": "Optional description",
  "status": "open",
  "priority": "medium",
  "created_at": "2025-08-27T10:00:00",
  "updated_at": "2025-08-27T10:00:00"
}
```

Read Issues
```text
GET /api/v1/issues/

Query Parameters:
skip: integer, default=0
limit: integer, default=100
status: open| in_progress| closed
priority: low| medium| high
sort_by: priority| created_at| updated_at

Response: List of issues filtered and sorted
```
Read Issue by ID
```text
GET /api/v1/issues/{issue_id}

Response:
{
  "id": 1,
  "title": "Issue title",
  "description": "Optional description",
  "status": "open",
  "priority": "medium",
  "created_at": "2025-08-27T10:00:00",
  "updated_at": "2025-08-27T10:00:00"
}

Error Response: 404 if not found.
```

Update Issue
```text
PUT /api/v1/issues/{issue_id}

Request Body:

{
  "title": "Updated title",
  "status": "closed",
  "priority": "high"
}

Response: Updated issue object
Error Response: 404 if issue not found
```

Delete Issue
```text
DELETE /api/v1/issues/{isssue_id}

Response: 204 No Content
Error Response: 404 if issue not found
```

---

## Testing

1. Install test dependencies
```bash

pip install pytest httpx pytest-asyncio requests

```

2. Run tests:
```bash

PYTHONPATH=$(pwd) pytest -v

```

3. Tests cover:
- CRUD operations
- Input validation
- sorting & filtering
- Error handling

---
## Author
Sanele Skhosana
