from . import BaseDocument
from utils import log
from mongoengine import (SequenceField,
                         StringField,
                         EmbeddedDocumentListField,
                         EmbeddedDocument,
                         IntField, )


class Option(EmbeddedDocument):
    Id = SequenceField()
    title = StringField(required=True)
    value = IntField(default=0)


class Vote(BaseDocument):
    Id = SequenceField()
    title = StringField(required=True)
    options = EmbeddedDocumentListField(Option, default=list)


# def test_init():
#     v = Vote()
#     v.title = '看够漫威了吗'
#     o1 = Option(title='yes')
#     o2 = Option(title='no')
#     v.options.append(o1)
#     v.options.append(o2)
#     v.save()


def test_query():
    v = Vote.get_by_id(1)
    log(v)


def test_update():
    v = Vote.get_by_id(1)
    v.options[0].value += 1
    v.save()
    log(v)


if __name__ == '__main__':
    # test_init()
    test_query()
