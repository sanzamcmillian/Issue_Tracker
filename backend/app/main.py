import os

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .api.endpoints import issues
from .core.database import Base, engine

# Auto-create SQLite tables at startup
Base.metadata.create_all(bind=engine)

app = FastAPI(title="Issue Tracker API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(issues.router)