from . import BaseDocument
from mongoengine import StringField, ReferenceField, DateTimeField
from utils import gen_session_id, log, json_response
from datetime import datetime

from .User import User


class Session(BaseDocument):
    meta = {
        'indexes': [
            {'fields': ['created'], 'expireAfterSeconds': 3600}
        ]
    }

    created = DateTimeField(default=datetime.now())
    session_id = StringField(required=True, default=gen_session_id)  # 天坑啊
    user = ReferenceField(User, required=True)

    @classmethod
    def new(cls, user):
        session = cls(user=user)
        session.save()
        return session

    @classmethod
    def user_from_session_id(cls, session_id):
        session = cls.objects(session_id=session_id).first()
        if session is not None:
            return session.user
        else:
            return None

    @classmethod
    def current_user(cls, session_id):
        if session_id is None:
            return None
        user = cls.user_from_session_id(session_id)
        return user

    def response(self):
        session_id = self.session_id
        return json_response({
            'status': 'success',
            'session_id': session_id,
        })


def test_session():
    user = User.get_by_name('chen')
    session = Session(session_id=gen_session_id())
    session.user = user
    session.save()


def test_user_from_session_id():
    log(Session.current_user('0ca-4f6c-afcb-d19d57e462b1'))


def test():
    pass


if __name__ == '__main__':
    test()
