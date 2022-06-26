FROM python:3.7
COPY requirements.txt /app/
WORKDIR /app
RUN pip install -r requirements.txt
COPY . /app
CMD ["uvicorn", "--port", "5000", "--host", "0.0.0.0", "--reload", "--reload-dir", "/app", "app:app"]