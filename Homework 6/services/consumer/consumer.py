from kafka import KafkaConsumer
import time
import redis

REDIS_PORT = 6379
WAIT_TIME = 5

pool = redis.ConnectionPool(host='localhost', port=REDIS_PORT, db=0)
consumer = KafkaConsumer('task_queue')
redis = redis.Redis(connection_pool=pool)

for message in consumer:
    print(message)
    redis.set('task "{message}"', 'accepted')
    time.sleep(WAIT_TIME)
    redis.set('task "{message}"', 'done')