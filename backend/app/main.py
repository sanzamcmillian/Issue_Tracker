from fastapi import FastAPI
from .api.endpoints import issues
from .core.database import Base, engine

# Auto-create SQLite tables at startup
Base.metadata.create_all(bind=engine)

app = FastAPI(title="Issue Tracker API")

app.include_router(issues.router, prefix="/issues", tags=["issues"])
