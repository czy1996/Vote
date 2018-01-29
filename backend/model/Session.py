from . import BaseDocument
from mongoengine import StringField, ReferenceField, DateTimeField
from utils import gen_session_id, log
from datetime import datetime

from .User import User


class Session(BaseDocument):
    meta = {
        'indexes': [
            {'fields': ['created'], 'expireAfterSeconds': 3600}
        ]
    }

    created = DateTimeField(default=datetime.now())
    session_id = StringField(required=True, default=gen_session_id())
    user = ReferenceField(User, required=True)




def test_session():
    user = User.get_by_name('chen')
    session = Session(session_id=gen_session_id())
    session.user = user
    session.save()


def test():
    pass


if __name__ == '__main__':
    test()
