FROM python:3.10-slim

# Set working directory
WORKDIR /code

# Install system dependencies needed for scikit-image / LIME
RUN apt-get update && apt-get install -y \
    build-essential \
    libgl1 \
    libglib2.0-0 \
    && rm -rf /var/lib/apt/lists/*

# Copy requirements first for caching
COPY ./requirements.txt /code/requirements.txt

# Install Python dependencies
RUN pip install --no-cache-dir --upgrade -r /code/requirements.txt

# Copy application code and model
COPY ./app /code/app
COPY ./model /code/model

# Expose Hugging Face default port
EXPOSE 7860

# Start FastAPI server using uvicorn on port 7860
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "7860"]
