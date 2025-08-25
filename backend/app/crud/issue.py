from sqlalchemy.orm import Session
from ..models.issue import Issue, IssueStatus, IssuePriority
from ..schemas.issue import IssueCreate, IssueUpdate
from typing import Optional, List

def get_issue(db: Session, issue_id: int):
    return db.query(Issue).filter(Issue.id == issue_id).first()

def get_issues(db: Session, skip: int = 0, limit: int = 100, status: Optional[IssueStatus] = None, priority: Optional[IssuePriority] = None, sort_by: Optional[str] = None) -> List[Issue]:
    query = db.query(Issue)
    if status:
        query = query.filter(Issue.status == status)

    if priority:
        query = query.filter(Issue.priority == priority)

    if sort_by == "priority":
        query = query.order_by(Issue.priority.desc())
    elif sort_by == "created_at":
        query = query.order_by(Issue.created_at.desc())
    elif sort_by == "updated_at":
        query = query.order_by(Issue.updated_at.desc())

    return query.offset(skip).limit(limit).all()

def create_issue(db: Session, issue: IssueCreate):
    db_issue = Issue(**issue.dict())
    db.add(db_issue)
    db.commit()
    db.refresh(db_issue)
    return db_issue

def update_issue(db: Session, issue_id: int, issue_update: IssueUpdate):
    db_issue = db.query(Issue).filter(Issue.id == issue_id).first()
    if not db_issue:
        return None
    for key, value in issue_update.dict(exclude_unset=True).items():
        setattr(db_issue, key, value)
    db.commit()
    db.refresh(db_issue)
    return db_issue

def delete_issue(db: Session, issue_id: int):
    db_issue = db.query(Issue).filter(Issue.id == issue_id).first()
    if not db_issue:
        return False
    db.delete(db_issue)
    db.commit()
    return True
