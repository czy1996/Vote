from flask import Flask, request
from utils import log, json_response

from routes.auth import main as auth_routes
from routes.vote import main as vote_routes
from routes.rsa import main as rsa_routes
from routes.user import main as user_routes

app = Flask(__name__)

app.register_blueprint(auth_routes, url_prefix='/auth')
app.register_blueprint(vote_routes, url_prefix='/vote')
app.register_blueprint(rsa_routes, url_prefix='/rsa')
app.register_blueprint(user_routes, url_prefix='/user')


@app.route('/')
def hello_world():
    return 'Hello World!'


if __name__ == '__main__':
    app.run(
        host='0.0.0.0',
        port=3000,
        debug=True,
    )
