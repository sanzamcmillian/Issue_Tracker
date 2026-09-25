from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    APP_NAME: str = "Issue Tracker API"
    DEBUG: bool = True
    DB_FILE: str = "sqlite:///./issue_tracker.db"
    DATABASE_URL: str | None = None

    @property
    def SQLALCHEMY_DATABASE_URL(self) -> str:
        return self.DATABASE_URL or self.DB_FILE

    class Config:
        env_file = ".env"

settings = Settings()
