from flask import Flask, request
from utils import log

app = Flask(__name__)


@app.route('/')
def hello_world():
    return 'Hello World!'


@app.route('/login', methods=['POST'])
def login():
    data = request.json
    log(data)
    return 'shit'


if __name__ == '__main__':
    app.run(
        host='0.0.0.0',
        port=3000,
        debug=True,
    )
