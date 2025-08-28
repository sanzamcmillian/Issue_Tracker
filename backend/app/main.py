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


if __name__ == "__main__":
    port = int(os.environ.get("PORT", 8000))
    uvicorn.run("main:app,", host="0.0.0.0", port=port, reload=False)