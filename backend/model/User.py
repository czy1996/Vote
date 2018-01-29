from . import BaseDocument
from utils import log
from mongoengine import SequenceField, StringField


class User(BaseDocument):
    Id = SequenceField()
    username = StringField(required=True)
    password = StringField(required=True)

    @classmethod
    def get_by_name(cls, name):
        return cls.objects(username=name).first()

    @classmethod
    def get_by_id(cls, _id):
        return cls.objects(Id=_id).first()


def test_user():
    user = User(username='chen', password='123')
    user.save()
    log(user)


def test_get_user():
    user = User.get_by_name('chen')
    log(user)


def test():
    pass


if __name__ == '__main__':
    test()
