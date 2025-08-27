from fastapi import APIRouter, Depends, HTTPException, status as http_status
from sqlalchemy.orm import Session
from typing import List, Optional

from ...schemas.issue import Issue, IssueCreate, IssueUpdate, IssueStatus, IssuePriority
from ...crud.issue import create_issue as crud_create, get_issues as crud_get_all, get_issue as crud_get, delete_issue as crud_delete, update_issue as crud_update
from ...core.database import get_db

router = APIRouter(prefix="/api/v1/issues", tags=["issues"])

@router.post("/", response_model=Issue, status_code=http_status.HTTP_201_CREATED)
def create_issue(issue: IssueCreate, db: Session = Depends(get_db)):
    return crud_create(db=db, issue=issue)

@router.get("/", response_model=List[Issue])
def read_issues(
    skip: int = 0,
    limit: int = 100,
    status: Optional[IssueStatus] = None,
    priority: Optional[IssuePriority] = None,
    sort_by: Optional[str] = None,
    db: Session = Depends(get_db),
):
    try:
        # Convert schema enums to model enums if necessary
        from ...models.issue import IssueStatus as ModelIssueStatus, IssuePriority as ModelIssuePriority

        model_status = ModelIssueStatus(status.value) if status is not None else None
        model_priority = ModelIssuePriority(priority.value) if priority is not None else None

        return crud_get_all(db, skip=skip, limit=limit, status=model_status, priority=model_priority, sort_by=sort_by)
    except ValueError as e:
        raise HTTPException(status_code=http_status.HTTP_400_BAD_REQUEST, detail=str(e))

@router.get("/{issue_id}", response_model=Issue)
def read_issue(issue_id: int, db: Session = Depends(get_db)):
    db_issue = crud_get(db, issue_id=issue_id)
    if not db_issue:
        raise HTTPException(status_code=http_status.HTTP_404_NOT_FOUND, detail="Issue not found")
    return db_issue

@router.put("/{issue_id}", response_model=Issue)
def update_issue(issue_id: int, issue_update: IssueUpdate, db: Session = Depends(get_db)):
    db_issue = crud_update(db, issue_id=issue_id, issue_update=issue_update)
    if not db_issue:
        raise HTTPException(status_code=http_status.HTTP_404_NOT_FOUND, detail="Issue not found")
    return db_issue

@router.delete("/{issue_id}", status_code=204)
def delete_issue(issue_id: int, db: Session = Depends(get_db)):
    success = crud_delete(db, issue_id=issue_id)
    if not success:
        raise HTTPException(status_code=http_status.HTTP_404_NOT_FOUND, detail="Issue not found")
    return None
