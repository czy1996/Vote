from flask import Flask, request
from utils import log, json_response

from routes.auth import main as auth_routes

app = Flask(__name__)

app.register_blueprint(auth_routes, url_prefix='/auth')


@app.route('/')
def hello_world():
    return 'Hello World!'


if __name__ == '__main__':
    app.run(
        host='0.0.0.0',
        port=3000,
        debug=True,
    )
