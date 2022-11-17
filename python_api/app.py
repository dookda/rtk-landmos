import time
import redis
from flask import Flask
from auth import pg

app = Flask(__name__)
cache = redis.Redis(host='redis', port=6379)

pg.autocommit = True
cursor = pg.cursor()


def get_hit_count():
    retries = 5
    while True:
        try:
            return cache.incr('hits')
        except redis.exceptions.ConnectionError as exc:
            if retries == 0:
                raise exc
            retries -= 1
            time.sleep(0.5)


@app.route('/')
def hello():
    count = get_hit_count()
    return 'Hello World! I have been seen {} times.\n'.format(count)
