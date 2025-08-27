import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from app.core.database import Base, get_db
from app.main import app
from app.models.issue import IssueStatus, IssuePriority

SQLALCHEMY_DATABASE_URL = "sqlite:///./test.db"
engine = create_engine(SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False})
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

def override_get_db():
    db = TestingSessionLocal()
    try:
        yield db
    finally:
        db.close()
        

app.dependency_overrides[get_db] = override_get_db

Base.metadata.create_all(bind=engine)

client = TestClient(app)


def create_test_issue(title="Test Issue", description="Desc", status="open", priority="medium"):
    return client.post("/api/v1/issues/", json={
        "title": title,
        "description": description,
        "status": status,
        "priority": priority
    })
    
    
def test_create_issue():
    response = create_test_issue()
    assert response.status_code == 201
    data = response.json()
    assert data["title"] == "Test Issue"
    assert data["status"] == "open"
    assert data["priority"] == "medium"
    assert "id" in data
    
    
def test_create_issue_invalid_status():
    response = create_test_issue(status="Invalid_status")
    assert response.status_code == 422
    
    
def test_read_issues():
    # Ensure at least one issue exists
    create_test_issue(title="Read Test")
    response = client.get("/api/v1/issues/")
    assert response.status_code == 200
    data = response.json()
    assert isinstance(data, list)
    assert any(issue["title"] == "Read Test" for issue in data)
    
    
def test_read_issues_with_filters():
    create_test_issue(title="Filter Test", status="in_progress", priority="high")
    response = client.get("/api/v1/issues/", params={"status": "in_progress", "priority": "high"})
    assert response.status_code == 200
    data = response.json()
    assert all(issue["status"] == "in_progress" and issue["priority"] == "high" for issue in data)
    
    
def test_read_issue_by_id():
    response = create_test_issue(title="Single Issue")
    issue_id = response.json()["id"]
    
    response = client.get(f"/api/v1/issues/{issue_id}")
    assert response.status_code == 200
    data = response.json()
    assert data["id"] == issue_id
    assert data["title"] == "Single Issue"
    
    
def test_read_issue_not_found():
    response = client.get("/api/v1/issues/999")
    assert response.status_code == 404
    assert response.json()["detail"] == "Issue not found"
    
    
def test_update_issue():
    response = create_test_issue(title="To Update")
    issue_id = response.json()["id"]
    
    update_data = {"title": "Updated Title", "status": "closed"}
    response = client.put(f"/api/v1/issues/{issue_id}", json=update_data)
    assert response.status_code == 200
    data = response.json()
    assert data["title"] == "Updated Title"
    assert data["status"] == "closed"
    
def test_update_issue_not_found():
    response = client.put("/api/v1/issues/9999", json={"title": "Nope"})
    assert response.status_code == 404
    assert response.json()["detail"] == "Issue not found"
    
    
def test_delete_issue():
    response = create_test_issue(title="To Delete")
    issue_id = response.json()["id"]
    
    response = client.delete(f"/api/v1/issues/{issue_id}")
    assert response.status_code == 204
    
    response = client.get(f"/api/v1/issues/{issue_id}")
    assert response.status_code == 404
    
    
def test_delete_issue_not_found():
    response = client.delete("/api/v1/issues/9999")
    assert response.status_code == 404
    assert response.json()["detail"] == "Issue not found"
    
    
def test_sort_issues():
    #Add multiple issues with different prioritites
    create_test_issue(title="Low", priority="low")
    create_test_issue(title="High", priority="high")
    response = client.get("/api/v1/issues", params={"sort_by": "priority"})
    
    assert response.status_code == 200
    data = response.json()
    priorities = [issue["priority"] for issue in data]
    assert "high" in priorities[:3]
    
    
def test_invalid_sort_by():
    response = client.get("/api/v1/issues", params={"sort_by": "invalid"})
    assert response.status_code == 400
    assert "Invalid sort field" in response.json()["detail"]