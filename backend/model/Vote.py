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

    def inc(self, value):
        self.value += value
        self.save()


class Vote(BaseDocument):
    Id = SequenceField()
    title = StringField(required=True)
    options = EmbeddedDocumentListField(Option, default=list)

    def get_option_by_id(self, _id):
        option = self.options.get(Id=_id)
        return option

    def inc_options(self, option_id, data):
        option = self.get_option_by_id(option_id)
        option.inc(data.get('inc', 0))
        self.reload()


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
    v.options[0].value
    v.save()
    log(v)


def test_query_option():
    vote = Vote.get_by_id(1)
    option = vote.get_option_by_id(1)
    option.value += 1
    vote.save()
    log(option)


def test_to_json():
    v = Vote.get_by_id(1)
    log(v.to_json(), type(v.to_json()))


if __name__ == '__main__':
    # test_init()
    test_query()
