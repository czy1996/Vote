from flask import (Blueprint,
                   request,
                   )
from model.User import User
from model.Session import Session

from . import current_user, current_session, login_required

from utils import (json_response, log)

main = Blueprint('auth', __name__)


@main.route('/login', methods=['POST'])
def login():
    data = request.json
    if User.validate_login(data):
        session = Session.new(User.get_by_name(data['username']))
        return session.response()
    else:
        return json_response({'status': 'fail'})


@main.route('/logout')
@login_required
def logout():
    session = current_session()
    session.delete()
    return json_response({'status': 'default'})
