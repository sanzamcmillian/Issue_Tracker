from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    APP_NAME: str = "Issue Tracker API"
    DEBUG: bool = True
    DB_FILE: str = "sqlite:///./issue_tracker.db"

    @property
    def DATABASE_URL(self) -> str:
        return self.DB_FILE

    class Config:
        env_file = ".env"

settings = Settings()
