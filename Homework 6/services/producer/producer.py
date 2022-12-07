from http.server import BaseHTTPRequestHandler, HTTPServer
from kafka import KafkaProducer
import redis
import signal

from parameters import REDIS_PORT, KAFKA_PORT, SERVER_PORT
# Порт Кафки 9092, Редиса 6379, HTTP Сервера 8901
REDIS_PORT = 6379
KAFKA_PORT = 9092
SERVER_PORT = 8901

producer = KafkaProducer(bootstrap_servers=f'localhost:{KAFKA_PORT}')
pool = redis.ConnectionPool(host='localhost', port=REDIS_PORT, db=0)
redis = redis.Redis(connection_pool=pool)

class HttpProcessor(BaseHTTPRequestHandler):
    def __init__(self):
        self.state = 'open'
        self.counter = 0
        self.limit_from_open = 2
        self.limit_from_closed = 2
        self.limit_from_half_open = 2
        self.timeout_from_closed = 5
        signal.signal(signal.SIGTERM, self.terminate)
        self.producer = KafkaProducer(bootstrap_servers=f'localhost:{KAFKA_PORT}')
        self.pool = redis.ConnectionPool(host='localhost', port=REDIS_PORT, db=0)

    def terminate(self):
        self.producer.close()

    def do_GET(self):
        request = self.requestline.split()[1]
        if request.startswith('/healthcheck'):
            self.send_response(200)
            self.send_header('content-type','text/html')
            self.end_headers()
            try:
                self.log_message('Healthcheck: OK')
                KafkaProducer(bootstrap_servers=f'localhost:{KAFKA_PORT}')
                self.wfile.write(b"OK")
            except:
                self.log_error('Healthcheck: Dead')
                self.wfile.write(b"Dead")
        elif request.startswith('/task'):
            redis.set(f'task {request} in_queue')
            producer.send('task_queue', b'request')  # b-строка, потому что требуется в битовом виде
            self.send_response(200)
            self.send_header('content-type','text/html')
            self.end_headers()
            self.wfile.write(b"I'm working!")


def main():
    serv = HTTPServer(("localhost", SERVER_PORT), HttpProcessor)
    serv.serve_forever()


if __name__ == '__main__':
    main()