FROM python:3.10

WORKDIR /usr/python

COPY requirements.txt .
COPY . .

# Install dependencies during the image build process
RUN pip install --no-cache-dir --upgrade pip
RUN pip install --no-cache-dir -r requirements.txt

# Use CMD to run gunicorn when the container starts
CMD ["gunicorn", "-w", "2", "-b", "0.0.0.0:8080", "--worker-class", "gevent", "--timeout", "30", "--keep-alive", "30", "app:app"]