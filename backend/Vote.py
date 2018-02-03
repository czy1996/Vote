from flask import Flask, request
from utils import log, json_response
from model.User import User
from model.Session import Session

app = Flask(__name__)


@app.route('/')
def hello_world():
    return 'Hello World!'


@app.route('/login', methods=['POST'])
def login():
    data = request.json
    if User.validate_login(data):
        session = Session.new(User.get_by_name(data['username']))
        return session.response()
    else:
        return json_response({'status': 'fail'})


if __name__ == '__main__':
    app.run(
        host='0.0.0.0',
        port=3000,
        debug=True,
    )
