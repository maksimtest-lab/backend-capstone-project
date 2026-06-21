FROM python:3.11-slim

WORKDIR /app

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1


RUN apt-get update && apt-get install -y \
    build-essential \
    git \
    netcat-openbsd \
    postgresql-client \
    curl \
    ca-certificates \
    unzip \
    && apt-get clean && rm -rf /var/lib/apt/lists/*


# Install uv
RUN curl -LsSf https://astral.sh/uv/install.sh | sh

ENV PATH="/root/.local/bin:${PATH}"

COPY backend/requirements.txt .

# Install dependencies via uv (super fast)
RUN uv pip install --system -r requirements.txt

COPY backend/ .
COPY static/ static_nginx/

COPY entrypoint_web.sh /entrypoint_web.sh

RUN chmod +x /entrypoint_web.sh

ENTRYPOINT ["/entrypoint_web.sh"]

CMD []
