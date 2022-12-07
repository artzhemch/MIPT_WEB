FROM python:3.10-slim-buster

WORKDIR /app

COPY ./producer.py .

RUN pip install kafka-python redis
CMD ["python3", "producer.py"]