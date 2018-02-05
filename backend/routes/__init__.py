from flask import request

from model.User import User
from model.Session import Session

from utils import log


def current_user():
    headers = request.headers
    session_id = headers.get('sessionId')
    user = Session.current_user(session_id)
    log(user)
    return user
