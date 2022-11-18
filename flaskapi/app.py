import time
import redis
from flask import Flask, jsonify
from auth import pg

app = Flask(__name__)
cache = redis.Redis(host='redis', port=6379)

pg.autocommit = True
cur = pg.cursor()


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


@app.route('/test')
def hello():
    count = get_hit_count()
    return 'Hello World! I have been seen {} times.\n'.format(count)


@app.route('/get_data')
def get_data():
    print(111)
    try:
        cur.execute('''SELECT * from base_sta''')
        rows = cur.fetchall()
        response = ''
        my_list = []
        for row in rows:
            my_list.append(row[0])

        return jsonify(rows), 200
    except Exception as e:
        print(e)
        return []


if __name__ == '__main__':
    app.run()
