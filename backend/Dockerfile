FROM python:3.12-slim

WORKDIR /app

# libpq-dev + gcc needed to build psycopg2-binary on slim images
RUN apt-get update && apt-get install -y --no-install-recommends \
        libpq-dev gcc \
    && rm -rf /var/lib/apt/lists/*

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY app ./app

EXPOSE 8000

# Same image runs locally (docker-compose) and on ECS Fargate later —
# only the DATABASE_URL env var changes between environments.
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
