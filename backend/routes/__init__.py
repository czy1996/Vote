from flask import request
from functools import wraps

from model.User import User
from model.Session import Session

from utils import log, json_response


def current_user():
    headers = request.headers
    session_id = headers.get('sessionId')
    user = Session.current_user(session_id)
    log(user)
    return user


def current_session():
    headers = request.headers
    session_id = headers.get('sessionId', None)
    log(session_id)
    if session_id is None:
        return None
    session = Session.objects(session_id=session_id).first()
    return session


def login_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if current_session() is None:
            response = json_response({'status': 'error'})
            response.status_code = 401
            return response
        return f(*args, **kwargs)
    return decorated_function
