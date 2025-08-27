from sqlalchemy import case
from sqlalchemy.orm import Session
from sqlalchemy.exc import SQLAlchemyError
from ..models.issue import Issue, IssueStatus, IssuePriority
from ..schemas.issue import IssueCreate, IssueUpdate
from typing import Optional, List

VALID_SORT_FIELDS = {"priority", "created_at", "updated_at"}

def get_issue(db: Session, issue_id: int):
    """Get an issue by its ID."""
    return db.query(Issue).filter(Issue.id == issue_id).first()

def get_issues(db: Session, skip: int = 0, limit: int = 100,
               status: Optional[IssueStatus] = None, priority: Optional[IssuePriority] = None,
               sort_by: Optional[str] = "created_at") -> List[Issue]:
    """Get a list of issues with optional filters."""
    if sort_by and sort_by not in VALID_SORT_FIELDS:
        raise ValueError(f"Invalid sort field: {sort_by}")
    
    query = db.query(Issue)

    if status:
        query = query.filter(Issue.status == status)

    if priority:
        query = query.filter(Issue.priority == priority)

    
    if sort_by == "priority":
        query = query.order_by(
            case(
                (Issue.priority == "high", 3),
                (Issue.priority == "medium", 2),
                (Issue.priority == "low", 1),
            ).desc()
        )
    elif sort_by == "created_at":
        query = query.order_by(Issue.created_at.desc())
    elif sort_by == "updated_at":
        query = query.order_by(Issue.updated_at.desc())

    return query.offset(skip).limit(limit).all()

def create_issue(db: Session, issue: IssueCreate):
    """Create a new issue."""
    db_issue = Issue(**issue.dict())
    db.add(db_issue)
    try:
        db.commit()
        db.refresh(db_issue)
    except SQLAlchemyError as e:
        db.rollback()
        print(f"Error occurred: {e}")
    return db_issue

def update_issue(db: Session, issue_id: int, issue_update: IssueUpdate) -> Optional[Issue]:
    """Update an existing issue."""
    db_issue = db.query(Issue).filter(Issue.id == issue_id).first()
    if not db_issue:
        return None
    
    for key, value in issue_update.dict(exclude_unset=True).items():
        setattr(db_issue, key, value)
    
    try:
        db.commit()
        db.refresh(db_issue)
    except SQLAlchemyError as e:
        db.rollback()
        print(f"Error occurred: {e}")
    return db_issue

def delete_issue(db: Session, issue_id: int) -> bool:
    """Delete an issue by its ID."""
    db_issue = db.query(Issue).filter(Issue.id == issue_id).first()
    if not db_issue:
        return False
    
    try:
        db.delete(db_issue)
        db.commit()
    except SQLAlchemyError as e:
        db.rollback()
        print(f"Error occurred: {e}")
    return True