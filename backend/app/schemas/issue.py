from pydantic import BaseModel
from datetime import datetime
from enum import Enum
from typing import Optional

class IssueStatus(str, Enum):
    open = "open"
    in_progress = "in_progress"
    closed = "closed"

class IssuePriority(str, Enum):
    low = "low"
    medium = "medium"
    high = "high"

class IssueBase(BaseModel):
    title: str
    description: Optional[str] = None
    status: IssueStatus = IssueStatus.open
    priority: IssuePriority = IssuePriority.medium

class IssueCreate(IssueBase):
    pass

class IssueUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    status: Optional[IssueStatus] = None
    priority: Optional[IssuePriority] = None

class IssueInDBBase(IssueBase):
    id: int
    created_at: datetime
    updated_at: datetime
    class Config:
        orm_mode = True

class Issue(IssueInDBBase):
    pass
