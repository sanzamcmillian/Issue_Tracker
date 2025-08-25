from sqlalchemy import Column, Integer, String, Text, Enum, DateTime, func
from ..core.database import Base
import enum


class IssueStatus(str, enum.Enum):
    open = "open"
    in_progress = "in_progress"
    closed = "closed"

class IssuePriority(str, enum.Enum):
    low = "low"
    medium = "medium"
    high = "high"

class Issue(Base):
    __tablename__ = "issues"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(200), nullable=False)
    description = Column(Text, nullable=True)
    status = Column(Enum(IssueStatus), nullable=False, default=IssueStatus.open)
    priority = Column(Enum(IssuePriority), nullable=False, default=IssuePriority.medium)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())
