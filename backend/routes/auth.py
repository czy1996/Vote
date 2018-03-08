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


@main.route('/register', methods=['POST'])
def register():
    data = request.json
    log(data)
    u = User(**data)
    u.save()
    session = Session.new(u)
    return session.response()


@main.route('/checkUsername')
def check_username():
    username = request.args.get('username', None)
    users = User.objects
    names = [user.username for user in users]
    return json_response({
        'isUnique': username is not None and username not in names,
    })
