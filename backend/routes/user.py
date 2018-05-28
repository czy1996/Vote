from flask import (Blueprint,
                   request,
                   )
from model.User import User
from model.Session import Session

from . import current_user, current_session, login_required

from utils import (json_response, log)

main = Blueprint('user', __name__)


@main.route('/all')
def get_all():
    users = User.objects
    result = []
    for u in users:
        result.append({
            'id': u.Id,
            'username': u.username,
        })
    return json_response(result)
