from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List, Optional

from ...schemas.issue import Issue, IssueCreate, IssueUpdate, IssueStatus, IssuePriority
from ...crud.issue import create_issue, get_issues, get_issue, delete_issue, update_issue
from ...core.database import get_db

router = APIRouter(prefix="/issues", tags=["issues"])

@router.post("/", response_model=Issue)
def created_issue(issue: IssueCreate, db: Session = Depends(get_db)):
    return create_issue(db=db, issue=issue)

@router.get("/", response_model=List[Issue])
def read_issues(
    skip: int = 0,
    limit: int = 100,
    status: Optional[IssueStatus] = None,
    priority: Optional[IssuePriority] = None,
    sort_by: Optional[str] = None,
    db: Session = Depends(get_db),
):
    return get_issues(db, skip=skip, limit=limit, status=status, priority=priority, sort_by=sort_by)

@router.get("/{issue_id}", response_model=Issue)
def read_issue(issue_id: int, db: Session = Depends(get_db)):
    db_issue = get_issue(db, issue_id=issue_id)
    if not db_issue:
        raise HTTPException(status_code=404, detail="Issue not found")
    return db_issue

@router.put("/{issue_id}", response_model=Issue)
def updated_issue(issue_id: int, issue_update: IssueUpdate, db: Session = Depends(get_db)):
    db_issue = update_issue(db, issue_id=issue_id, issue_update=issue_update)
    if not db_issue:
        raise HTTPException(status_code=404, detail="Issue not found")
    return db_issue

@router.delete("/{issue_id}", status_code=204)
def deleted_issue(issue_id: int, db: Session = Depends(get_db)):
    success = delete_issue(db, issue_id=issue_id)
    if not success:
        raise HTTPException(status_code=404, detail="Issue not found")
    return None
